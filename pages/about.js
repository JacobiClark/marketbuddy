import React, { useState, useEffect } from "react";
import Select from "react-select";
//https://stackoverflow.com/questions/67010295/react-select-hooks-state-not-changing-when-react-select-onchange-prop-handling
export default function about() {
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
          let suggestionsFormattedForSelect = data.quotes.map((suggestion) => {
            let suggestionData = {
              value: suggestion.symbol,
              label: suggestion.symbol + " | " + suggestion.shortname,
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
    }, 1000);
    return () => clearTimeout(timer);
  }, [userSearchInput]);

  return (
    <Select
      value={userSearchInput}
      options={searchSuggestions}
      onInputChange={(searchInput) => setUserSearchInput(searchInput)}
      placeholder={"Search a ticker"}
    />
  );
}
