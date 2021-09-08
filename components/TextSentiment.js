import React, { useState, useEffect } from "react";
import { average } from "../utils/helpers";

import {
  Spinner,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Center,
  HStack,
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
          return analyzeSentiment(article);
        })
      );
      setNewsData(filteredNewsData);
      setNewsSentiment(newsDataSentimentScores);
      setIsloading(false);
    }
    fetchNewsData();
  }, []);

  if (isLoading) {
    return (
      <Box align="center">
        <Text>Performing Sentiment Analysis...</Text>
        <Spinner />
      </Box>
    );
  }
  if (newsData.length < 1) {
    return (
      <Center h="50px">
        Unable to fetch recent {ticker} articles for sentiment analysis. Please
        try another stock.
      </Center>
    );
  }
  return (
    <Box>
      <Center>
        <HStack>
          <Text fontWeight="bold">Average Sentiment Score: </Text>
          <Text
            fontWeight="bold"
            fontSize="xl"
            color={getScoreColor(average(newsSentiment))}
          >
            {average(newsSentiment).toFixed(5)}
          </Text>
        </HStack>
      </Center>

      <Table variant="unstlyed">
        <Thead>
          <Tr>
            <Th style={{ textAlign: "center" }}>Article</Th>
            <Th style={{ textAlign: "center" }}>Sentiment Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {newsData.map((article, index) => {
            return (
              <Tr key={article.title}>
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
                      <AccordionPanel maxW="100%" pb={2}>
                        {article.summary}
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Td>
                <Td isNumeric color={getScoreColor(newsSentiment[index])}>
                  {newsSentiment.length != 0
                    ? newsSentiment[index].toFixed(5)
                    : 0}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TextSentiment;
