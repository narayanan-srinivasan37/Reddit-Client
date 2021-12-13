import React from "react";
import "./SideBar.css";
import SubReddit from "../SubReddit/SubReddit";
import FilterSide from "../FilterPage/FilterPage";
import AboutCard from "../Card/AboutCard/AboutCard";
import UserCard from "../Card/UserCard/UserCard";
const SideBar = (props) => {
  return (
    <div>
    <div className="side-bar">
      {props.filter && <FilterSide />}
      {props.about && <AboutCard about={props.subreddittype} />}
      {props.user && <UserCard username={props.username} />}
      <SubReddit  />
    </div>
    <div className='sidebar-subreddit'>
    <SubReddit  />
    </div>
    </div>

  );
};

export default SideBar;
