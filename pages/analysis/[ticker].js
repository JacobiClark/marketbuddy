import React, { useState, useEffect } from "react";
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
import Chart from "../../components/Chart";

const Analysis = () => {
  const router = useRouter();
  const { ticker } = router.query;

  const [chartData, setChartData] = useState({});

  useEffect(() => {
    async function fetchRechartData() {
      const res = await fetch(
        "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=5m&symbol=AMRN&range=1d&region=US",
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.YAHOO_FINANCE_KEY,
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          },
        }
      );
      const rechartData = await res.json();
      setChartData(rechartData);
    }

    fetchRechartData();
  }, []);

  if (Object.keys(chartData) == 0) {
    // not loaded
    return <div>Loading...</div>;
  }

  return (
    <Container maxW="container.lg" p="3">
      <StatGroup>
        <Stat>
          <p>{chartData.chart.result[0].meta.symbol}</p>
          <StatNumber>
            {chartData.chart.result[0].meta.regularMarketPrice}
          </StatNumber>
          <StatHelpText>
            <StatArrow
              type={
                chartData.chart.result[0].meta.regularMarketPrice >
                chartData.chart.result[0].meta.previousClose
                  ? "increase"
                  : "decrease"
              }
            ></StatArrow>
            {chartData.chart.result[0].meta.previousClose /
              chartData.chart.result[0].meta.regularMarketPrice.toFixed(2)}
          </StatHelpText>
        </Stat>
      </StatGroup>
      <Chart chartData={chartData} />
    </Container>
  );
};

export default Analysis;
