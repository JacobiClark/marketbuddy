import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import { Link } from "@chakra-ui/react";

const SearchBar = () => {
  const [userSearchInput, setUserSearchInput] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  useEffect(() => {
    const searchSuggestions = async (searchInput) => {
      const searchSuggestions = await fetch(
        "https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=" +
          searchInput +
          "&region=US",
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.YAHOO_FINANCE_KEY,
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          let suggestionsFormattedForSelect = data.quotes
            .slice(0, 5)
            .map((suggestion) => {
              let suggestionData = {
                value: suggestion.symbol,
                label: suggestion.shortname,
              };
              return suggestionData;
            });
          setSearchSuggestions(suggestionsFormattedForSelect);
        });
    };

    const timer = setTimeout(() => {
      if (userSearchInput !== "") {
        searchSuggestions(userSearchInput);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [userSearchInput]);

  const formatOptionLabel = ({ value, label }) => (
    <Link key={value} href={"/analysis/" + value}>
      <p style={{ color: "black" }}>{value + " | " + label}</p>
    </Link>
  );

  return (
    <Select
      value={userSearchInput}
      options={searchSuggestions}
      onInputChange={(searchInput) => setUserSearchInput(searchInput)}
      placeholder={"Search"}
      formatOptionLabel={formatOptionLabel}
      noOptionsMessage={() => ""}
    />
  );
};

export default SearchBar;
