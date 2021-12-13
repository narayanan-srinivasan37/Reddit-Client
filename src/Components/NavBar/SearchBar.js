import React  from "react";
import AsyncSelect from "react-select/async";
import { components} from "react-select";
import { redditSearch } from "../../API_Calls/RedditApiCalls";
import { HiOutlineSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import "./NavBar.css";
import SubRowDisplay from "../SubRowDisplay/SubRowDisplay";
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator s {...props}>
      <HiOutlineSearch label="" />
    </components.DropdownIndicator>
  );
};

const Menu = (props) => {
  if (props.options.length === 0) {
    return <components.Menu {...props}>{props.children}</components.Menu>;
  }
  return (
    <components.Menu {...props}>
      {
        <div
          style={{ height: "300px", overflowY: "scroll", overflowX: "hidden" }}
        >
          {props.options.map((option, index) => {
            return <SubRowDisplay key={index} {...option} />;
          })}
        </div>
      }
    </components.Menu>
  );
};
const SearchBar = () => {
  const navigate = useNavigate();
  const handleChange = (inputvalue, { action }) => {
    if (action === "set-value") {
      return "";
    }
    return inputvalue;
  };

  const loadOptions = async (inputValue, callback) => {
    if (inputValue.length < 3 || !inputValue) {
      callback([]);
    }
    const response = await redditSearch(inputValue);
    const result = response.data.children.map((data) => {
      return {
        displayName: data.data.display_name,
        value: data.data.display_name,
        subscribersCount: data.data.subscribers,
        displayImg: data.data.icon_img,
      };
    });

    callback(result);
  };
  return (
    <div style={{ width: "50%" }}>
      <AsyncSelect
        loadOptions={loadOptions}
        onInputChange={handleChange}
        defaultOptions
        value=""
        components={{ DropdownIndicator, Menu }}
        onChange={(e, { action }) => {
          navigate(`/subreddit/${e.value}`);
        }}
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBar;
