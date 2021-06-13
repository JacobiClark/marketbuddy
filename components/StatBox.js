import React from "react";

import { Box, Text } from "@chakra-ui/react";

const StatBox = ({ statType, statValue }) => {
  return (
    <Box
      p="4"
      width={{
        base: "50%", // 0-48em
        md: "25%", // 48em-80em,
        xl: "20%", // 80em+
      }}
    >
      <Text fontWeight="bold">{statType}</Text>
      <Text>{statValue}</Text>
    </Box>
  );
};

export default StatBox;
