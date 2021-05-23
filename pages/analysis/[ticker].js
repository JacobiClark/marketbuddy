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
import Stats from "../../components/Stats";
import TextSentiment from "../../components/TextSentiment";

const Analysis = () => {
  const router = useRouter();
  const { ticker } = router.query;
  const [summaryData, setSummaryData] = useState({});

  useEffect(() => {
    async function fetchSummaryData() {
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
      console.log(summary);
      setSummaryData(summary);
    }
    fetchSummaryData();
  }, []);

  if (Object.keys(summaryData) == 0) {
    console.log("nf");
    return <div>Loading...</div>;
  }
  console.log(summaryData);

  return (
    <Container p="0" m="0" maxW="container.lg">
      <Stats summaryData={summaryData} />
      <Chart ticker={ticker} />
      <AnalysisTabs />
    </Container>
  );
};

export default Analysis;
