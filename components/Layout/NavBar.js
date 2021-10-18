import React from "react";
import SearchBar from "../SearchBar";
import { Flex, Center, Box } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import stonkhead from "../../public/stonkhead.png";

const NavBar = () => {
  return (
    <Flex justifyContent="center" alignItems="center" mb="3">
      <Link href="/">
        <a>
          <Flex position="absolute" top="4" left="2%" alignItems="top">
            MarketBuddy
            <Image
              src={stonkhead}
              alt="Stonks"
              width={24}
              automatically
              provided
              height={10}
              automatically
              provided
              // blurDataURL="data:..." automatically provided
              // placeholder="blur" // Optional blur-up while loading
            />
          </Flex>
        </a>
      </Link>
      <Box p="2" flex="1" maxW="500px" position="relative" ml="115">
        <SearchBar />
      </Box>
    </Flex>
  );
};

export default NavBar;
