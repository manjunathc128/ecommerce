import React, { useState } from "react";

import styles from "./search.module.css";
import { useAppContext } from "../context/AppContext/AppContext";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { dispatch } = useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({ type: "SEARCH_PRODUCT", payload: searchQuery });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch({ type: "SEARCH_PRODUCT", payload: searchQuery });
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className={styles.searchInput}
        aria-label="Search"
      />
      <button
        onClick={handleSearch}
        className={styles.searchButton}
        aria-label="Search"
      >
        <SearchIcon className={styles.searchIcon} fontSize="large" />
      </button>
    </div>
  );
};

export default Search;
