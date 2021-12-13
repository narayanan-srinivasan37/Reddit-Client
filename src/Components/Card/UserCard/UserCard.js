import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuserAbout } from "../../../ReduxStore/Reducers/userAboutSlice";
import "./UserCard.css";
import { GiCakeSlice } from "react-icons/gi";
import { BsFlower2 } from "react-icons/bs";
import { getTimeDate } from "../../../Helper/time";
import { numberFormat } from "../../../Helper/NumberFormat";

const UserCard = (props) => {
  const dispatch = useDispatch();
  const { isLoading, isError, useraboutData } = useSelector(
    (state) => state.userAbout
  );

  useEffect(() => {
    dispatch(getuserAbout(props.username));
  }, [props]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const banner_img = (url) => {
    let split = url.split(/(jpg|jpeg|png|gif|bmp)/);
    const joinedstring = split[0] + split[1];
    return joinedstring;
  };
  const userData = useraboutData.data;

  return (
    <div className="user-about">
      <div className="banner-image">
        {userData.subreddit.banner_img && (
          <img
            className="banner-image"
            src={banner_img(userData.subreddit.banner_img)}
            alt="banner_img"
          />
        )}
      </div>
      <section style={{ zIndex: 100 }}>
        <div className="user-icon">
          <img
            style={{ height: "200px", paddingBottom: "10px" }}
            src={
              userData.snoovatar_img
                ? userData.snoovatar_img
                : "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"
            }
            alt="snoovatar_img"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          {userData.name}
        </div>
        <p className="user-description">
          {userData.subreddit.public_description}
        </p>
        <div className="user-midsection">
          <div className="karma">
            <p>Karma</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BsFlower2 />
              &nbsp;{numberFormat(userData.comment_karma)}
            </div>
          </div>

          <div className="karma">
            <p>Cake Day</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GiCakeSlice />
              &nbsp;{getTimeDate(userData.created * 1000)[0]}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserCard;
