import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { useDataProvider } from "../components/dataProvider";
import { Search } from "../components/Search";
export function SearchBar() {
  const { updateSelectedFilter, searchedItem, updateSearch } = useDataProvider();
  const [showSearch, setShowSearch] = useState(false); // Initialize showSearch state variable
  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("query", searchedItem);
    if (searchedItem !== "") {
      updateSelectedFilter("Search");
      navigate("/menu");
      setShowSearch(true); // Set showSearch to true when form is submitted and searchedItem is not empty
    } else {
      setShowSearch(false); // Hide the Search component when form is submitted and searchedItem is empty
    }
  };

  const handleChange = (event) => {
    updateSearch(event.target.value);
  };

  return (
    <div style={{ borderRadius: "25px" }} display="grid">
      <form className="search-bar" onSubmit={handleSubmit}>
        <label htmlFor="searchInput" className="sr-only"></label>
        <input
          type="text"
          id="searchInput"
          value={searchedItem}
          onChange={handleChange}
          placeholder="Search..."
          aria-label="Search"
        />
        <Button
          type="submit"
          bg="none"
          _hover={{ bg: "none" }}
          _active={{ transform: "translateY(2px)" }}
          title="Search"
        >
          <FaSearch className="search-icon" />
        </Button>
      </form>
 
    </div>
  );
}