import axios from "axios";
const tf = require("@tensorflow/tfjs");

const getModel = async () => {
  const model = await tf.loadLayersModel(
    `https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json`
  );
  return model;
};

const getGoogletfjsMetaData = async () => {
  try {
    const response = await axios({
      method: "GET",
      url:
        "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json",
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const padSequences = (sequences) => {
  return sequences.map((seq) => {
    if (seq.length > 100) {
      seq.splice(0, seq.length - 100);
    }
    if (seq.length < 100) {
      const pad = [];
      for (let i = 0; i < 100 - seq.length; ++i) {
        pad.push(0);
      }
      seq = pad.concat(seq);
    }
    return seq;
  });
};

padSequences(["a", "b", "c d"]);

const predict = async (text, model, metadata) => {
  if (text === null) {
    return 0;
  }
  const trimmed = text
    .trim()
    .toLowerCase()
    .replace(/(\.|\,|\!)/g, "")
    .split(" ");
  const sequence = trimmed.map((word) => {
    const wordIndex = metadata.word_index[word];
    if (typeof wordIndex === "undefined") {
      return 2; //oov_index
    }
    return wordIndex + metadata.index_from;
  });
  const paddedSequence = padSequences([sequence], metadata);
  const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);

  const predictOut = model.predict(input);
  const score = predictOut.dataSync()[0];
  predictOut.dispose();
  return score;
};

export const analyzeSentiment = async (text) => {
  const model = await getModel();
  const tfjsMetaData = await getGoogletfjsMetaData();
  const score = await predict(text, model, tfjsMetaData);
  return score;
};
