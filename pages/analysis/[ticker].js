import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { Container } from "@chakra-ui/react";

import Chart from "../../components/Chart";
import AnalysisTabs from "../../components/AnalysisTabs";
import Stats from "../../components/Stats";

const Analysis = () => {
  const router = useRouter();
  const { ticker } = router.query;

  return (
    <Container p="0" m="0" maxW="container.lg">
      <Stats ticker={ticker} />
      <Chart ticker={ticker} />
      <AnalysisTabs ticker={ticker} />
    </Container>
  );
};

export default Analysis;
