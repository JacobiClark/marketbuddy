import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import {
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

const Stats = ({ ticker }) => {
  const [summaryData, setSummaryData] = useState({});

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
      } catch (error) {
        console.error(error);
      }
    }
    fetchSummaryData();
  }, [ticker]);

  if (Object.keys(summaryData) == 0) {
    return <div>Loading...</div>;
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
                  summaryData.price.regularMarketPrice.fmt >
                  summaryData.price.regularMarketPreviousClose.fmt
                    ? "increase"
                    : "decrease"
                }
              ></StatArrow>
              {summaryData.price.regularMarketPrice.fmt >
              summaryData.price.regularMarketPreviousClose.fmt
                ? "+"
                : "-"}
              {Math.abs(
                summaryData.price.regularMarketPrice.fmt -
                  summaryData.price.regularMarketPreviousClose.fmt
              ).toFixed(2)}
              {"  ("}
              {summaryData.price.regularMarketPrice.fmt >
              summaryData.price.regularMarketPreviousClose.fmt
                ? "+"
                : "-"}
              {Math.abs(
                (100 *
                  (summaryData.price.regularMarketPrice.fmt -
                    summaryData.price.regularMarketPreviousClose.fmt)) /
                  summaryData.price.regularMarketPreviousClose.fmt
              ).toFixed(2)}
              {"%)"}
            </Box>
          </StatHelpText>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default Stats;
