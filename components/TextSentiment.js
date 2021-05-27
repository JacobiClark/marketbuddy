import React, { useState, useEffect } from "react";
import Sentiment from "sentiment";
import {
  Spinner,
  Box,
  Table,
  Thead,
  Tbody,
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

const getScoreColor = (score) => {
  if (score > 0.7) {
    return "green";
  }
  if (score < 0.3) {
    return "red";
  }
  return "yellow";
};

const TextSentiment = ({ ticker }) => {
  const [newsData, setNewsData] = useState({});
  const [newsSentiment, setNewsSentiment] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    async function fetchNewsData() {
      const res = await fetch(
        "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-news?category=" +
          ticker +
          "&region=US",
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.YAHOO_FINANCE_KEY,
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          },
        }
      );
      const newsData = await res.json();
      let filteredNewsData = await newsData.items.result.filter(
        (result) => result.content != null
      );
      const newsDataSentimentScores = await Promise.all(
        filteredNewsData.map(async (article) => {
          return analyzeSentiment(article.content);
        })
      );
      setNewsData(filteredNewsData);

      setIsloading(false);
      setNewsSentiment(newsDataSentimentScores);
    }
    fetchNewsData();
  }, []);

  if (isLoading) {
    return (
      <Box align="center">
        <Spinner />
      </Box>
    );
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
              <Td color={getScoreColor(newsSentiment[index])}>
                {newsSentiment.length != 0
                  ? newsSentiment[index].toFixed(5)
                  : 0}
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default TextSentiment;
