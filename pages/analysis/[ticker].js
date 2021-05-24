import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { Container, Box } from "@chakra-ui/react";

import Chart from "../../components/Chart";
import AnalysisTabs from "../../components/AnalysisTabs";
import Stats from "../../components/Stats";

const Analysis = () => {
  const router = useRouter();
  const { ticker } = router.query;

  return (
    <Box>
      <Stats ticker={ticker} />
      <Chart ticker={ticker} />
      <AnalysisTabs ticker={ticker} />
    </Box>
  );
};

export default Analysis;
