import React, { useState, useEffect, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import api from "../../services/searchAPI";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [suggestionOpen, setSuggestionOpen] = useState(false); 
  const [searchResults, setSearchResults] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  const handleSelection = (selectedIndex) => {
    const selectedItem = searchResults[selectedIndex];
    if (!selectedItem) return resetSearchComplete();
    navigate(`/course/${selectedItem._id}`); // Adjust the path based on your route
    resetSearchComplete();
  };

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1);
    setSuggestionOpen(false);
  }, []);
  
  const navigate = useNavigate();
  const delay = 500; // delay for 0.5 secs

  useEffect(() => {
    if(!keyword) {
      setSuggestionOpen(false);
      return;
    }
    const fetchResults = async () => {
      const results = await api.getCourses(keyword);
      console.log("This is result:::",results);
      setSearchResults(results.courses);
      console.log("This is result::",searchResults);
      setSuggestionOpen(true);
    };

    const timerId = setTimeout(fetchResults, delay);

    return () => clearTimeout(timerId);
  }, [keyword]);

  const handleChange = (event) => {
    setKeyword(event.target.value);
    setSuggestionOpen(false);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".search-bar-container")) {
      resetSearchComplete();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    navigate(`/search?keyword=${keyword}`); 
  };

  const handleKeyDown = (event) => {
    const { key } = event;

    if (key === "ArrowDown" && focusedIndex < searchResults.length - 1) {
      event.preventDefault();
      setFocusedIndex((prevIndex) => prevIndex + 1);
    } else if (key === "ArrowUp" && focusedIndex > 0) {
      event.preventDefault();
      setFocusedIndex((prevIndex) => prevIndex - 1);
    } else if (key === "Enter" && focusedIndex !== -1) {
      event.preventDefault();
      handleSelection(focusedIndex);
    }
  };

  return (
    <div className="relative flex-1 w-full mr-8 border border-gray-300 rounded-full search-bar-container hover:bg-white hover:bg-opacity-25 md:w-auto md:flex">
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-2">
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder="Search..."
        aria-label="search"
        className="block w-full py-3 pl-12 pr-3 text-black bg-transparent focus:outline-none"
        value={keyword}
        onChange={handleChange}
      />
      {suggestionOpen && (
          <ul className="absolute z-10 w-full mt-1 bg-white rounded shadow-lg">
            {searchResults.map((result, index) => (
              <li
                key={result._id}
                onMouseDown={() => handleSelection(index)}
                onMouseEnter={() => setFocusedIndex(index)}
                
                className={`p-2 cursor-pointer ${
                  index === focusedIndex ? "bg-gray-200" : ""
                }`}
              >
                <Link to={`/course/${result._id}`}>{result.courseTitle}</Link>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}