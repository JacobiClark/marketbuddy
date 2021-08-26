import React, { useState, useEffect } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import {
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

const Stats = ({ ticker }) => {
  const [summaryData, setSummaryData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSummaryData() {
      try {
        const res = await fetch(
          "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=" +
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
        const summary = await res.json();
        setSummaryData(summary);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSummaryData();
  }, []);

  if (isLoading) {
    return (
      <Box align="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <Box>
      <StatGroup>
        <Stat>
          {summaryData.quoteType.shortName}
          <StatNumber>{summaryData.price.regularMarketPrice.fmt}</StatNumber>
          <StatHelpText>
            <Box d="flex" alignItems="center">
              <StatArrow
                type={
                  parseFloat(summaryData.price.regularMarketPrice.fmt) >
                  parseFloat(summaryData.price.regularMarketPreviousClose.fmt)
                    ? "increase"
                    : "decrease"
                }
              ></StatArrow>
              {parseFloat(summaryData.price.regularMarketPrice.fmt) >
              parseFloat(summaryData.price.regularMarketPreviousClose.fmt)
                ? "+"
                : "-"}
              {Math.abs(
                parseFloat(summaryData.price.regularMarketPrice.fmt) -
                  parseFloat(summaryData.price.regularMarketPreviousClose.fmt)
              ).toFixed(2)}
              {"  ("}
              {parseFloat(summaryData.price.regularMarketPrice.fmt) >
              parseFloat(summaryData.price.regularMarketPreviousClose.fmt)
                ? "+"
                : "-"}
              {Math.abs(
                (100 *
                  (parseFloat(summaryData.price.regularMarketPrice.fmt) -
                    parseFloat(
                      summaryData.price.regularMarketPreviousClose.fmt
                    ))) /
                  parseFloat(summaryData.price.regularMarketPreviousClose.fmt)
              ).toFixed(2)}
              {"%) Today"}
            </Box>
          </StatHelpText>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default Stats;
