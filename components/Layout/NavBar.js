import React from "react";
import SearchBar from "../SearchBar";
import { Flex, Center, Box } from "@chakra-ui/react";
import Link from "next/link";

const NavBar = () => {
  return (
    <Flex justifyContent="center" alignItems="center" mb="3">
      <Center p="2" position="absolute" top="2" left="0">
        <Link href="/">
          <a>MarketBuddy</a>
        </Link>
      </Center>
      <Box p="2" flex="1" maxW="500px" position="relative" ml="115">
        <SearchBar />
      </Box>
    </Flex>
  );
};

export default NavBar;
