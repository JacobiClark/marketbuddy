import React from "react";
import SearchBar from "../SearchBar";
import { Flex, Center, Box } from "@chakra-ui/react";
import Link from "next/link";

const NavBar = () => {
  return (
    <Flex>
      <Center p="4">
        <Link href="/">
          <a>MarketBuddy</a>
        </Link>
      </Center>
      <Box p="4" flex="1">
        <SearchBar />
      </Box>
    </Flex>
  );
};

export default NavBar;
