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
        <Box maxW="900">
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>Market Cap</Td>
                <Td isNumeric>
                  {statisticsData?.summaryDetail?.marketCap?.fmt ?? "--"}
                </Td>
              </Tr>
              <Tr>
                <Td>Cash On Hand</Td>
                <Td isNumeric>
                  {statisticsData?.financialData?.totalCash?.fmt ?? "--"}
                </Td>
              </Tr>
              <Tr>
                <Td>Debt</Td>
                <Td isNumeric>
                  {statisticsData?.financialData?.totalDebt?.fmt ?? "--"}
                </Td>
              </Tr>
              <Tr>
                <Td>Profit Margins</Td>
                <Td isNumeric>
                  {statisticsData?.defaultKeyStatistics?.profitMargins?.fmt ??
                    "--"}
                </Td>
              </Tr>

              <Tr>
                <Td>Last Dividend</Td>
                <Td isNumeric>
                  {statisticsData?.defaultKeyStatistics?.lastDividendValue
                    ?.fmt ?? "--"}
                </Td>
              </Tr>
              <Tr>
                <Td>Short Percentage</Td>
                <Td isNumeric>
                  {statisticsData?.defaultKeyStatistics?.shortPercentOfFloat
                    ?.fmt ?? "--"}
                </Td>
              </Tr>
              <Tr>
                <Td>Daily Volume</Td>
                <Td isNumeric>
                  {statisticsData?.price?.regularMarketVolume?.fmt ?? "--"}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Center>
    </Fragment>
  );
};

export default Statistics;
