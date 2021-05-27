import React from "react";
import { Box } from "@chakra-ui/react";

import Chart from "../../components/Chart";
import AnalysisTabs from "../../components/AnalysisTabs";
import Stats from "../../components/Stats";

export const getServerSideProps = async (context) => {
  const ticker = context.params.ticker;
  return {
    props: { ticker: ticker },
  };
};

const Analysis = ({ ticker }) => {
  return (
    <Box>
      <Stats ticker={ticker} />
      <Chart ticker={ticker} />
      <AnalysisTabs ticker={ticker} />
    </Box>
  );
};

export default Analysis;
