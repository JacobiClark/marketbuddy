import React from "react";
import SearchBar from "../SearchBar";
import { Flex, Center, Box, Grid, GridItem } from "@chakra-ui/react";
import Link from "next/link";

const NavBar = () => {
  return (
    <Flex justifyContent="center" position="relative">
      <Center p="3" position="fixed" left="0">
        <Link href="/">
          <a>MarketBuddy</a>
        </Link>
      </Center>
      <Box p="2" width="200px">
        <SearchBar />
      </Box>
    </Flex>
  );
};

export default NavBar;
