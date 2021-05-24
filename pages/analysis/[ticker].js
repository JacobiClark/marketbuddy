import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { Container } from "@chakra-ui/react";

import Chart from "../../components/Chart";
import AnalysisTabs from "../../components/AnalysisTabs";
import Stats from "../../components/Stats";

const Analysis = () => {
  const router = useRouter();
  const { ticker } = router.query;
  const [summaryData, setSummaryData] = useState({});
  const [summaryDataLoading, setSummaryDataLoading] = useState(true);

  useEffect(() => {
    console.log("UE");
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
      setSummaryData(summary);
      setSummaryDataLoading(false);
    }
    fetchSummaryData();
  }, [ticker]);

  return (
    <Container p="0" m="0" maxW="container.lg">
      {!summaryDataLoading && <Stats summaryData={summaryData} />}
      <Chart ticker={ticker} />
      <AnalysisTabs />
    </Container>
  );
};

export default Analysis;
