import Head from "next/head";
import NavBar from "../components/Layout/NavBar";
import { VStack, Container } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import {
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
  console.log(tableData);
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
    <Table variant="simple">
      <TableCaption placement="top">Top Daily Gainers</TableCaption>
      <Thead>
        <Tr>
          <Th>Symbol</Th>
          <Th>Previous Close</Th>
          <Th>Price</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tableData.slice(0, 5).map((gainer) => {
          return (
            <Tr>
              <Td>
                <Link href={"/analysis/" + gainer.symbol} key={gainer.symbol}>
                  {gainer.symbol}
                </Link>
              </Td>
              <Td>{gainer.previousClose}</Td>
              <Td>{gainer.price}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
