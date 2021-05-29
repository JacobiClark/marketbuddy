import React, { useState, useEffect } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import StatBox from "./StatBox";

const Statistics = ({ ticker }) => {
  const [statisticsData, setStatisticsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatisticsData = async () => {
      try {
        const res = await fetch(
          "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-statistics?symbol=" +
            ticker,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": process.env.YAHOO_FINANCE_KEY,
              "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            },
          }
        );
        const statistics = await res.json();
        setStatisticsData(statistics);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStatisticsData();
  }, [ticker]);

  if (isLoading) {
    return (
      <Box align="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <Flex wrap="wrap" alignItems="center" justifyContent="space-between">
      <StatBox
        statType="Market Cap"
        statValue={statisticsData.summaryDetail.marketCap.fmt}
      />
      <StatBox
        statType="PE Ratio"
        statValue={statisticsData.summaryDetail.trailingPE.fmt}
      />
    </Flex>
  );
};

export default Statistics;
