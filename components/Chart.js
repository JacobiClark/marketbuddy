import React, { useState } from "react";
import { Button, Container, Stack, Box } from "@chakra-ui/react";
import {
  LineChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const handleTimeRangeSelect = (event, timeRangeSet) => {
  setTimeRange(timeRangeSet);
};

function Chart({ chartData }) {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const ranges = [
    { range: "1d", interval: "1m", long: "1 day" },
    { range: "5d", interval: "5m", long: "5 days" },
    { range: "1mo", interval: "15m", long: "1 month" },
    { range: "3mo", interval: "60m", long: "3 months" },
    { range: "6mo", interval: "60m", long: "6 months" },
    { range: "1y", interval: "1d", long: "1 year" },
    { range: "2y", interval: "1d", long: "2 years" },
    { range: "5y", interval: "1d", long: "5 years" },
  ];
  const [timeRange, setTimeRange] = useState(ranges[0]);

  return (
    <div>
      <Box width="500" height="500" bg="red">
        <ResponsiveContainer>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Stack direction="row" spacing={4} align="center">
        {ranges.map((rangeSet) => {
          return (
            <Button
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
