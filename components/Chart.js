import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Stack,
  Box,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { formatResponseForRechart } from "../utils/responseFormatters";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
const fetch = require("node-fetch");

function Chart({ ticker }) {
  const [chartData, setChartData] = useState(null);

  const ranges = [
    { range: "1d", interval: "5m", long: "1 day" },
    { range: "5d", interval: "15m", long: "5 days" },
    { range: "1mo", interval: "15m", long: "1 month" },
    { range: "3mo", interval: "60m", long: "3 months" },
    { range: "6mo", interval: "1d", long: "6 months" },
    { range: "1y", interval: "1d", long: "1 year" },
    { range: "2y", interval: "1d", long: "2 years" },
    { range: "5y", interval: "1d", long: "5 years" },
  ];
  const [timeRange, setTimeRange] = useState({
    range: "1d",
    interval: "5m",
    long: "1 day",
  });

  useEffect(() => {
    console.log(chartData);
    fetch(
      "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=" +
        timeRange.interval +
        "&symbol=" +
        ticker +
        "&range=" +
        timeRange.range +
        "&region=US",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.YAHOO_FINANCE_KEY,
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        },
      }
    )
      .then((data) => data.json())
      .then((data) => {
        setChartData(formatResponseForRechart(data));
        console.log(data);
        console.log(chartData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [timeRange]);

  if (!chartData) {
    return (
      <Box align="center">
        <Spinner />
      </Box>
    );
  }

  console.log(chartData);

  if (chartData.rechartData.length < 10) {
    return (
      <Center h="50px">
        Unable to fetch {ticker} chart data from the API. Please try another
        stock.
      </Center>
    );
  }

  return (
    <div>
      <Box mt="3" mb="1">
        <ResponsiveContainer width="95%" height={400}>
          <LineChart
            data={chartData.rechartData}
            axisLine={false}
            margin={{ right: 8 }}
          >
            <XAxis dataKey="timestamp" tick={false}></XAxis>
            <YAxis
              width={45}
              domain={[chartData.chartLow, chartData.chartHigh]}
              dx={-5}
            />
            <ReferenceLine
              y={chartData.rechartData[0].price}
              stroke="black"
              strokeDasharray="3 3"
            />
            <Line
              type="monotone"
              dataKey="close"
              name="close"
              stroke={
                parseFloat(chartData.rechartData[0].close) <
                parseFloat(
                  chartData.rechartData[chartData.rechartData.length - 1].close
                )
                  ? "green"
                  : "red"
              }
              strokeWidth={2}
              dot={false}
            />
            <Tooltip
              cursor={false}
              wrapperStyle={{ color: "black" }}
              dataKey="close"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Stack
        direction="row"
        spacing={3}
        align="center"
        justify="center"
        mt="1"
        mb="3"
      >
        {ranges.map((rangeSet) => {
          return (
            <Button
              key={rangeSet.range}
              size="sm"
              value={rangeSet}
              variant="solid"
              onClick={() => setTimeRange(rangeSet)}
            >
              {rangeSet.range}
            </Button>
          );
        })}
      </Stack>
    </div>
  );
}

export default Chart;
