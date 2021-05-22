import React from "react";
import { Box } from "@chakra-ui/react";
import {
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

const Stats = ({ summaryData }) => {
  return (
    <Box>
      <StatGroup>
        <Stat>
          {summaryData.quoteType.shortName}
          <StatNumber>{summaryData.price.regularMarketPrice.fmt}</StatNumber>
          <StatHelpText>
            <Box d="flex" alignItems="center">
              <StatArrow
                type={
                  summaryData.price.regularMarketPrice.fmt >
                  summaryData.price.regularMarketPreviousClose.fmt
                    ? "increase"
                    : "decrease"
                }
              ></StatArrow>
              {summaryData.price.regularMarketPrice.fmt >
              summaryData.price.regularMarketPreviousClose.fmt
                ? "+"
                : "-"}
              {Math.abs(
                summaryData.price.regularMarketPrice.fmt -
                  summaryData.price.regularMarketPreviousClose.fmt
              ).toFixed(2)}
              {"  ("}
              {summaryData.price.regularMarketPrice.fmt >
              summaryData.price.regularMarketPreviousClose.fmt
                ? "+"
                : "-"}
              {Math.abs(
                (100 *
                  (summaryData.price.regularMarketPrice.fmt -
                    summaryData.price.regularMarketPreviousClose.fmt)) /
                  summaryData.price.regularMarketPreviousClose.fmt
              ).toFixed(2)}
              {"%)"}
            </Box>
          </StatHelpText>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default Stats;
