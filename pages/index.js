import Head from "next/head";
import NavBar from "../components/Layout/NavBar";
import { VStack, Container } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import React, { useState } from "react";
import { getPercentDifference } from "../utils/helpers";
import {
  Wrap,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

export async function getServerSideProps(context) {
  const movers = await fetch(
    "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-movers?region=US&lang=en-US&start=0&count=6",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.YAHOO_FINANCE_KEY,
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      },
    }
  ).then((response) => response.json());

  const gainers = movers.finance.result[0].quotes.map((quote) => quote.symbol);
  const losers = movers.finance.result[1].quotes.map((quote) => quote.symbol);
  const mostTraded = movers.finance.result[2].quotes.map(
    (quote) => quote.symbol
  );
  const quotesCallPrefix =
    "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=";
  const quotesCallTickersSuffix = gainers
    .concat(losers, mostTraded)
    .join("%2C");
  const quotesCallString = quotesCallPrefix.concat(quotesCallTickersSuffix);

  const quotes = await fetch(quotesCallString, {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.YAHOO_FINANCE_KEY,
      "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
  }).then((response) => response.json());
  const tableData = quotes.quoteResponse.result.map((quote) => {
    let quoteData = {
      symbol: quote.symbol,
      previousClose: quote.regularMarketPreviousClose,
      price: quote.regularMarketPrice,
    };
    return quoteData;
  });
  if (!tableData) {
    return {
      notFound: true,
    };
  }

  return {
    props: { tableData }, // will be passed to the page component as props
  };
}

export default function Home({ tableData }) {
  return (
    <Wrap spacing="30px" justify="center" alignContent="center">
      <Table
        variant="simple"
        width={[
          "100%", // base
          "40%", // 480px upwards
        ]}
      >
        <TableCaption placement="top">Most Active</TableCaption>
        <Thead>
          <Tr>
            <Th>Symbol</Th>
            <Th>Previous Close</Th>
            <Th>Current Price</Th>
            <Th>Change</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.slice(12, 18).map((active) => {
            return (
              <Tr key={active.symbol}>
                <Td>
                  <Link
                    color="#4FBCFF"
                    key={active.symbol}
                    href={"/analysis/" + active.symbol}
                  >
                    {active.symbol}
                  </Link>
                </Td>
                <Td>{active.previousClose}</Td>
                <Td>{active.price}</Td>
                <Td>
                  {getPercentDifference(active.previousClose, active.price)}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Table
        variant="simple"
        width={[
          "100%", // base
          "40%", // 480px upwards
        ]}
      >
        <TableCaption placement="top">Top Daily Gainers</TableCaption>
        <Thead>
          <Tr>
            <Th>Symbol</Th>
            <Th>Previous Close</Th>
            <Th>Current Price</Th>
            <Th>Change</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.slice(0, 6).map((gainer) => {
            return (
              <Tr key={gainer.symbol}>
                <Td>
                  <Link
                    color="#4FBCFF"
                    key={gainer.symbol}
                    href={"/analysis/" + gainer.symbol}
                  >
                    {gainer.symbol}
                  </Link>
                </Td>
                <Td>{gainer.previousClose}</Td>
                <Td>{gainer.price}</Td>
                <Td>
                  {getPercentDifference(gainer.previousClose, gainer.price)}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Table
        variant="simple"
        width={[
          "100%", // base
          "40%", // 480px upwards
        ]}
      >
        <TableCaption placement="top">Top Daily Losers</TableCaption>
        <Thead>
          <Tr>
            <Th>Symbol</Th>
            <Th>Previous Close</Th>
            <Th>Current Price</Th>
            <Th>Change</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.slice(6, 12).map((loser) => {
            return (
              <Tr key={loser.symbol}>
                <Td>
                  <Link
                    color="#4FBCFF"
                    key={loser.symbol}
                    href={"/analysis/" + loser.symbol}
                  >
                    {loser.symbol}
                  </Link>
                </Td>
                <Td>{loser.previousClose}</Td>
                <Td>{loser.price}</Td>
                <Td>
                  {getPercentDifference(loser.previousClose, loser.price)}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Wrap>
  );
}
