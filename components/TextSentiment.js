import React, { useState, useEffect } from "react";
import Sentiment from "sentiment";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { analyzeSentiment } from "../pages/api/sentimentAnalysis";
import * as tf from "@tensorflow/tfjs";

const PAD_INDEX = 0; // Index of the padding character.
const OOV_INDEX = 2; // Index fo the OOV character.

const padSequences = (
  sequences,
  maxLen,
  padding = "pre",
  truncating = "pre",
  value = PAD_INDEX
) => {
  return sequences.map((seq) => {
    if (seq.length > maxLen) {
      if (truncating === "pre") {
        seq.splice(0, seq.length - maxLen);
      } else {
        seq.splice(maxLen, seq.length - maxLen);
      }
    }

    if (seq.length < maxLen) {
      const pad = [];
      for (let i = 0; i < maxLen - seq.length; ++i) {
        pad.push(value);
      }
      if (padding === "pre") {
        seq = pad.concat(seq);
      } else {
        seq = seq.concat(pad);
      }
    }

    return seq;
  });
};

const getSentimentScore = (text) => {
  console.log(text);
  const inputText = text
    .trim()
    .toLowerCase()
    .replace(/(<([^>]+)>)/gi, "")
    .split(" ");
  console.log(inputText);
  const sequence = inputText.map((word) => {
    let wordIndex = metaData.word_index[word] + metaData.index_from;
    if (wordIndex > metaData.vocabulary_size) {
      wordIndex = OOV_INDEX;
    }
    return wordIndex;
  });
  console.log(sequence);
  // Perform truncation and padding.
  const paddedSequence = padSequences([sequence], metaData.max_len);
  console.log(metaData.max_len);

  const input = tf.tensor2d(paddedSequence, [1, metaData.max_len]);
  console.log(input);
  const predictOut = model.predict(input);
  const score = predictOut.dataSync()[0];
  predictOut.dispose();
  return score;
};

const sentiment = new Sentiment();

const TextSentiment = () => {
  const url = {
    model:
      "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json",
    metadata:
      "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json",
  };
  const OOV_INDEX = 2;
  const [newsData, setNewsData] = useState({});
  const [newsSentiment, setNewsSentiment] = useState([]);
  const [metadata, setMetadata] = useState();
  const [model, setModel] = useState();
  const [testText, setText] = useState("");
  const [testScore, setScore] = useState("");
  const [trimedText, setTrim] = useState("");
  const [seqText, setSeq] = useState("");
  const [padText, setPad] = useState("");
  const [inputText, setInput] = useState("");

  async function loadModel(url) {
    try {
      const model = await tf.loadLayersModel(url.model);
      setModel(model);
    } catch (err) {
      console.log(err);
    }
  }

  async function loadMetadata(url) {
    try {
      const metadataJson = await fetch(url.metadata);
      const metadata = await metadataJson.json();
      setMetadata(metadata);
    } catch (err) {
      console.log(err);
    }
  }

  const getSentimentScore = (text) => {
    console.log(text);
    const inputText = text
      .trim()
      .toLowerCase()
      .replace(/(\.|\,|\!)/g, "")
      .split(" ");
    setTrim(inputText);
    console.log(inputText);
    const sequence = inputText.map((word) => {
      let wordIndex = metadata.word_index[word] + metadata.index_from;
      if (wordIndex > metadata.vocabulary_size) {
        wordIndex = OOV_INDEX;
      }
      return wordIndex;
    });
    setSeq(sequence);
    console.log(sequence);
    // Perform truncation and padding.
    const paddedSequence = padSequences([sequence], metadata.max_len);
    console.log(metadata.max_len);
    setPad(paddedSequence);

    const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);
    console.log(input);
    setInput(input);
    const predictOut = model.predict(input);
    const score = predictOut.dataSync()[0];
    predictOut.dispose();
    setScore(score);
    return score;
  };

  useEffect(() => {
    tf.ready().then(() => {
      loadModel(url);
      loadMetadata(url);
    });
  }, []);

  useEffect(() => {
    async function fetchNewsData() {
      const res = await fetch(
        "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-news?category=GME&region=US",
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.YAHOO_FINANCE_KEY,
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          },
        }
      );
      const newsData = await res.json();
      console.log(newsData);
      let filteredNewsData = await newsData.items.result.filter(
        (result) => result.content != null
      );
      const newsDataSentimentScores = filteredNewsData.map((article) =>
        getSentimentScore(article.summary)
      );
      console.log(newsDataSentimentScores);
      setNewsData(filteredNewsData);
      setNewsSentiment(newsDataSentimentScores);
    }
    fetchNewsData();
  }, []);

  if (Object.keys(newsData) == 0) {
    // not loaded
    return <div>Loading...</div>;
  }

  return (
    <Table variant="unstlyed">
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
        <Tr>
          <Th style={{ textAlign: "center" }}>Article</Th>
          <Th style={{ textAlign: "center" }}>Sentiment Score</Th>
        </Tr>
      </Thead>
      <Tbody>
        {newsData.map((article, index) => {
          return (
            <Tr>
              <Td>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {article.title}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel maxW="100%" pb={4}>
                      {article.summary}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Td>
              <Td>
                {newsSentiment.length != 0 ? newsSentiment[index].score : 0}
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default TextSentiment;
