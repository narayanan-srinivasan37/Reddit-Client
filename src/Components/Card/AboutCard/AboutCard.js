import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getsubredditAbout } from "../../../ReduxStore/Reducers/SubRedditAboutSlice";
import { numberFormat } from "../../../Helper/NumberFormat";
import { getTimeDate } from "../../../Helper/time";
import { FaBirthdayCake } from "react-icons/fa";
import "./AboutCard.css";
const AboutCard = (props) => {
  const dispatch = useDispatch();
  const { isLoading,subredditaboutData } = useSelector(
    (state) => state.subredditAbout
  );
  useEffect(() => {
    dispatch(getsubredditAbout(props.about));
  }, []);
  if (isLoading) {
    return <div>Loading</div>;
  }
  const data = subredditaboutData.data;

  const section = () => {
    return (
      <div>
        {data.public_description === "" ? (
          <p>Welcome to {data.title}</p>
        ) : (
          <p>{data.public_description}</p>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft:'5px'
          }}
        >
          <div className="about-subscribers">
            <div>{numberFormat(data.subscribers)}</div>
            <p>Members</p>
          </div>
          <div className="about-subscribers">
            <div>{numberFormat(data.accounts_active)}</div>
            <p>Online</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="subreddit-about">
      <div className="about-title">
        <p>About {data.display_name} Community</p>
      </div>
      <section className="about-section">{section()}</section>
      <div className="about-footer">
        <FaBirthdayCake />
        <p>&nbsp;Created</p>
        <p>&nbsp;{getTimeDate(data.created * 1000)[0]}</p>
      </div>
    </div>
  );
};

export default AboutCard;
