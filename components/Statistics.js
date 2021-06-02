import React, { useState, useEffect, Fragment } from "react";
import {
  Box,
  Flex,
  Spinner,
  Center,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
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
        console.log(statistics);
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
    <Fragment>
      <Center>
        <Box maxW="500">
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Tbody>
              <Tr>
                <Td>Market Cap</Td>
                <Td isNumeric>
                  {statisticsData?.summaryDetail?.marketCap?.fmt ?? "--"}
                </Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot>
          </Table>
        </Box>
      </Center>
      <Flex wrap="wrap" alignItems="center" justifyContent="space-between">
        <StatBox
          statType="Market Cap"
          statValue={statisticsData?.summaryDetail?.marketCap?.fmt ?? "--"}
        />
        <StatBox
          statType="PE Ratio"
          statValue={statisticsData?.summaryDetail?.trailingPE?.fmt ?? "--"}
        />
        <StatBox
          statType="PE Ratio"
          statValue={statisticsData?.summaryDetail?.trailingPE?.fmt ?? "--"}
        />
        <StatBox
          statType="PE Ratio"
          statValue={statisticsData?.summaryDetail?.trailingPE?.fmt ?? "--"}
        />
        <StatBox
          statType="PE Ratio"
          statValue={statisticsData?.summaryDetail?.trailingPE?.fmt ?? "--"}
        />
        <StatBox
          statType="PE Ratio"
          statValue={statisticsData?.summaryDetail?.trailingPE?.fmt ?? "--"}
        />
        <StatBox
          statType="PE Ratio"
          statValue={statisticsData?.summaryDetail?.trailingPE?.fmt ?? "--"}
        />
      </Flex>
    </Fragment>
  );
};

export default Statistics;
