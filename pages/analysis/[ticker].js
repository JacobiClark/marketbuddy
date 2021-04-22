import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { Container, Box } from "@chakra-ui/react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import Chart from "../../components/Chart";
import AnalysisTabs from "../../components/AnalysisTabs";

const Analysis = () => {
  const router = useRouter();
  const { ticker } = router.query;

  const [summaryData, setSummaryData] = useState({});

  useEffect(() => {
    async function fetchSummaryData() {
      const res = await fetch(
        "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=AMRN&region=US",
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.YAHOO_FINANCE_KEY,
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          },
        }
      );
      const summary = await res.json();
      console.log(summary);
      setSummaryData(summary);
    }
    fetchSummaryData();
  }, []);

  if (Object.keys(summaryData) == 0) {
    return <div>Loading...</div>;
  }
  console.log(summaryData);

  return (
    <Container p="3" maxW="xl">
      <Box>
        <StatGroup>
          <Stat>
            {summaryData.symbol}
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
                {(
                  summaryData.price.regularMarketPrice.fmt -
                  summaryData.price.regularMarketPreviousClose.fmt
                ).toFixed(2)}
                {"  ("}
                {summaryData.price.regularMarketPrice.fmt >
                summaryData.price.regularMarketPreviousClose.fmt
                  ? "+"
                  : "-"}
                {(
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
      <Chart />
      <AnalysisTabs />
    </Container>
  );
};

export default Analysis;
