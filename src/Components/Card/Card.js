import React, { useState, useRef, useEffect } from "react";
import "./Card.css";
import Hls from "hls.js";
import Avatar from "@mui/material/Avatar";
import { BsLink } from "react-icons/bs";
import { Waypoint } from "react-waypoint";
import VideoPlayer from "react-video-js-player";
import { Link } from "react-router-dom";
import { getTimeDate, postCreation } from "../../Helper/time";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import { numberFormat } from "../../Helper/NumberFormat";
import { useLocation } from "react-router-dom";
const Card = (props) => {
  let [data, setData] = useState(null);

  var hls = null;

  useEffect(() => {
    setData(props.data);
  }, []);
  const { pathname } = useLocation();

  let videoElement = useRef();

  useEffect(() => {
    if (Hls.isSupported) {
      hls = new Hls();
    }
    if (videoElement.current !== undefined) {
      const video_url = data.hsl_video.reddit_video.hls_url;
      hls.loadSource(video_url);
      hls.attachMedia(videoElement.current);
    }
  }, [data]);
  /** Set Post time in seonds hours days and month**/
  function get_date(date) {
    const get_data = getTimeDate(date);
    return postCreation(get_data);
  }
  const thumbnail = () => {
    const pattern = /(jpg|jpeg|png|gif|bmp)/;

    const image = new Image();
    if (data.url.match(pattern)) {
      image.src = data.url;

      if (image.height !== 0) {
        return <Avatar alt={data.title} src={data.url} />;
      }
    } else {
      return <Avatar>{data.author[0].toUpperCase()}</Avatar>;
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
      if (pathname.match(comment)) {
        return (
          <p
            style={{
              WebkitLineClamp: "none",
              fontSize: "0.8rem",
              margin: "0 0 0.2rem 0.2rem",
            }}
          >
            {data.selfText}
          </p>
        );
      }
      return (
        <p style={{ WebkitLineClamp: 2 }} className="selfText">
          {data.selfText.substring(0, 100)}...
        </p>
      );
    }
    if (
      data.post_hint === undefined &&
      data.selfText.length === 0 &&
      !data.url.match(comment)
    ) {
      return (
        <div className="section-link">
          <a rel="noopener" target="_blank" href={data.url}>
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
      return (
        <Waypoint
          onEnter={() => {
            if (videoElement.current !== undefined) {
              const play = videoElement.current.play();

              if (play !== undefined) {
                play.then(() => videoElement.current.play()).catch((err) => {});
              }
            }
          }}
          onLeave={() => {
            if (videoElement.current !== undefined) {
              const pause = videoElement.current.pause();
              if (pause !== undefined) {
                pause
                  .then(() => videoElement.current.pause())
                  .catch((err) => {});
                {
                }
              }
            }
          }}
          topOffset="30%"
          bottomOffset="50%"
        >
          <div
            className="section-video"
            onClick={() => {
              if (videoElement.current !== undefined) {
                videoElement.current.muted = !videoElement.current.muted;
              }
            }}
          >
            <video
              style={{ margin: "auto", maxHeight: " 500px", maxWidth: "560px" }}
              preload="auto"
              ref={(video) => {
                videoElement.current = video;
              }}
              width="100%"
              height="100%"
              type="application/x-mpegurl"
              volume={1}
            ></video>
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
              style={{
                display: "flex",
                flexWrap: "wrap",
                lineHeight: "0rem",
              }}
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
