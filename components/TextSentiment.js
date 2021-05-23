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

const TextSentiment = () => {
  const [newsData, setNewsData] = useState({});
  const [newsSentiment, setNewsSentiment] = useState([]);

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
      let filteredNewsData = await newsData.items.result.filter(
        (result) => result.content != null
      );
      const newsDataSentimentScores = await Promise.all(
        filteredNewsData.map(async (article) => {
          return analyzeSentiment(article.content);
        })
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
              <Td>{newsSentiment.length != 0 ? newsSentiment[index] : 0}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default TextSentiment;
