import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import "./Card.css";
import { BsLink } from "react-icons/bs";
import { Waypoint } from "react-waypoint";
import { Link } from "react-router-dom";
import { getTimeDate, postCreation } from "../../Helper/time";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import { numberFormat } from "../../Helper/NumberFormat";
import CardLayout from "../SkeletonFolder/Card/CardLayout";
const Card = (props) => {
  let [shouldPlay, updatePlayState] = useState(false);
  let [unmute, updatemuteState] = useState(true);
  let [data, setData] = useState(null);

  useEffect(() => {
    setData(props.data);
 
  }, [props.data]);
  const wrapper = useRef();
  const onClickOnVideo = () => {
    updatemuteState(!unmute);
  };
  /** Set Post time in seonds hours days and month**/
  function get_date(date) {
    const get_data = getTimeDate(date);
    return postCreation(get_data);
  }

  let handleEnterViewport = function () {
    updatePlayState(true);
  };
  let handleExitViewport = function () {
    updatePlayState(false);
  };

  const thumbnail = () => {
    const pattern = /(jpg|jpeg|png|gif|bmp)/;

    const image = new Image();
    image.src = data.thumbnail;

    if (data.thumbnail.match(pattern) && image.height !== 0) {
      return <img className="card-img" src={data.thumbnail} alt="none" />;
    } else {
      return <div className="card-h4">{data.author[0]}</div>;
    }
  };
  const sectiondata = () => {
    const image = new Image();
    const comment = /comments/;
    if (data.post_hint === "image") {
      image.src = data.url;
    }
    if (data.post_hint === "image" && data.isGallery === undefined) {
      return <img className="section-image" src={data.url} alt="none" />;
    }

    if (data.post_hint === undefined && data.selfText.length !== 0) {
      return <p className="selfText">{data.selfText}</p>;
    }
    if (
      data.post_hint === undefined &&
      data.selfText.length === 0 &&
      !data.url.match(comment)
    ) {
      return (
        <div className="section-link">
          <a rel="noopener" href={data.url}>
            <div className="external-link">
              <BsLink style={{ paddingRight: 5 }} />
              External Link
            </div>
          </a>
        </div>
      );
    }
    if (data.post_hint === "link") {
      return (
        <div className="section-link">
          <a rel="noopener" href={data.url}>
            <div className="external-link">
              <BsLink style={{ paddingRight: 5 }} />
              External Link
            </div>
          </a>
        </div>
      );
    }

    if (data.post_hint === "hosted:video") {
      const video_url = data.hsl_video.reddit_video.hls_url;
      return (
        <Waypoint
          ref={wrapper}
          onEnter={handleEnterViewport}
          onLeave={handleExitViewport}
          topOffset="30%"
          bottomOffset="50%"
        >
          <div className="section-video" onClick={onClickOnVideo}>
            <ReactPlayer
              height="100%"
              width="100%"
              volume={1}
              muted={unmute}
              playing={shouldPlay}
              url={video_url}
            />
          </div>
        </Waypoint>
      );
    }
  };

  const comment_num = () => {
    if (props.nolink) {
      return (
        <div className="comment-num">
          <ModeCommentIcon />
          {numberFormat(data.numComments)}
        </div>
      );
    } else {
      return (
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={{
            pathname: `/${data.subreddit}/comments/${data.id}`,
          }}
        >
          <div className="comment-num">
            <ModeCommentIcon />
            {numberFormat(data.numComments)}
          </div>
        </Link>
      );
    }
  };

  const sectionTitle = () => {
    if (props.nolink) {
      return <h4 className="title">{data.title}</h4>;
    } else {
      return (
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={{
            pathname: `/${data.subreddit}/comments/${data.id}`,
          }}
        >
          <h4 className="title">{data.title}</h4>
        </Link>
      );
    }
  };
 
  return (
    <div>
      {data && (
        <div className="card">
          <div className="header">
            {thumbnail()}
            <div
              style={{ display: "flex", flexWrap: "wrap", lineHeight: "0rem" }}
            >
              <Link
                className="card-subreddit"
                style={{ textDecoration: "none", color: "black" }}
                to={`/subreddit/${data.subreddit}`}
              >
                <p>{data.subreddit}</p>
              </Link>
              <p style={{ color: "grey" }}> posted by </p>{" "}
              <Link
                className="card-author"
                style={{ textDecoration: "none", color: "grey" }}
                to={`/user/${data.author}`}
              >
                <p>{data.author}</p>
              </Link>
              <p style={{ color: "grey" }}>
                &nbsp;{get_date(data.created * 1000)}
              </p>
            </div>
          </div>
          <div className="section">
            {sectionTitle()}
            {sectiondata()}
          </div>

          <footer className="card-footer">
            <div className="upVote">
              <ArrowUpwardIcon />
              {numberFormat(data.ups)}
              <ArrowDownwardIcon />
            </div>
            {comment_num()}
          </footer>
        </div>
      )}
    </div>
  );
};

export default Card;
