const tf = require("@tensorflow/tfjs");
const getModel = async () => {
  try {
    const model = await tf.loadLayersModel(
      `https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json`
    );
    return model;
  } catch (error) {
    console.log(error);
  }
};

const getTfjsMetaData = async () => {
  try {
    const tfjsMetaData = await fetch(
      "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json"
    );
    return tfjsMetaData.json();
  } catch (error) {
    console.log(error);
  }
};

const padSequences = (sequences) => {
  return sequences.map((sequence) => {
    if (sequence.length > 100) {
      sequence.splice(0, sequence.length - 100);
    }
    if (sequence.length < 100) {
      const pad = [];
      for (let i = 0; i < 100 - sequence.length; ++i) {
        pad.push(0);
      }
      sequence = pad.concat(sequence);
    }
    return sequence;
  });
};

const getSentimentScore = async (text, model, metaData) => {
  const inputText = text
    .toLowerCase()
    .trim()
    .replace(/(\.|\,|\!)/g, "")
    .split(" ");
  const sequence = inputText.map((word) => {
    const wordIndex = metaData.word_index[word];
    if (wordIndex == "undefined") {
      return null;
    }
    return wordIndex + metaData.index_from;
  });
  const paddedSequence = padSequences([sequence], metaData);
  const inputTensor = tf.tensor2d(paddedSequence, [1, metaData.max_len]);
  const modelPrediction = model.predict(inputTensor);
  const sentimentScore = modelPrediction.dataSync()[0];
  modelPrediction.dispose();
  return sentimentScore;
};

export const analyzeSentiment = async (article) => {
  const model = await getModel();
  const tfjsMetaData = await getTfjsMetaData();
  const titleScore = await getSentimentScore(
    article.title,
    model,
    tfjsMetaData
  );
  const contentScore = await getSentimentScore(
    article.content,
    model,
    tfjsMetaData
  );
  return (titleScore * 2 + contentScore) / 3;
};
