// src/components/TourSearchPage.jsx

import React, { useState } from "react";
import { Container } from "@mui/material";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";

const TourSearchPage = () => {
  // This state holds the tours found by the search bar
  const [searchResults, setSearchResults] = useState([]);

  // This function is passed to the SearchBar.
  // The SearchBar will call it with the data it fetches.
  const handleSearch = (tours) => {
    setSearchResults(tours);
  };

  return (
    <Container sx={{ py: 4 }}>
      {/* SearchBar gets the function to update the results */}
      <SearchBar onSearch={handleSearch} />

      {/* SearchResults receives the results to display */}
      <SearchResults tours={searchResults} />
    </Container>
  );
};

export default TourSearchPage;