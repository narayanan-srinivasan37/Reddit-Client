import React, { useState } from "react";

import { components } from "react-select";
import { redditSearch } from "../../API_Calls/RedditApiCalls";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./NavBar.css";
import SubRowDisplay from "../SubRowDisplay/SubRowDisplay";

const data = [
  {
    id: 0,
    name: "Cornelia Leon",
  },
  {
    id: 1,
    name: "Joyce Shepard",
  },
  {
    id: 2,
    name: "Beatriz Davenport",
  },
  {
    id: 3,
    name: "Narayanaan",
  },
  {
    id: 4,
    name: "Balaji",
  },
  {
    id: 5,
    name: "Seshan",
  },
];

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const displayOptions = () => {
    if (options.length === 0) {
      return (
        <div className="search-results">
          <p>Searching...</p>
        </div>
      );
    } else {
      return (
        <div className="search-results-options">
          {options.map((option, index) => {
            return (
              <div
                onClick={() => {
                  navigate(`/subreddit/${option.displayName}`);
                }}
              >
                <SubRowDisplay key={index} {...option} />
              </div>
            );
          })}
        </div>
      );
    }
  };

  const loadOptions = async (query) => {
    try {
      const response = await redditSearch(query);
      const result = response.data.children.map((data) => {
        return {
          displayName: data.data.display_name,
          value: data.data.display_name,
          subscribersCount: data.data.subscribers,
          displayImg: data.data.icon_img,
        };
      });
      setOptions(result);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-input-div">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid black",
          }}
        >
          <input
            className="search-input"
            type="text"
            placeholder="search.."
            value={query}
            onBlur={() => {
              setTimeout(() => {
                setDisplay(false);
                setLoading(false);
              }, 200);
            }}
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setDisplay(true);
                setLoading(true);
                if (e.target.value.length > 2) loadOptions(e.target.value);
                else setOptions([]);
              } else {
                setDisplay(false);
                setLoading(false);
              }
              setQuery(e.target.value);
            }}
          />
          {loading && (
            <CircularProgress
              style={{ marginRight: "0.3rem" }}
              size={20}
              color="inherit"
            />
          )}
        </div>
        <div className="search-results">{display && displayOptions()}</div>
      </div>
    </div>
  );
};
export default SearchBar;
