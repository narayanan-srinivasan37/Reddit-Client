import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Post.css";

export default function Post(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const data = props.postData;
    const filterdata = data.filter((data) => data.kind === "t3");
    const filteredData = filterdata.map((data) => {
      return {
        author: data.data.author,
        title: data.data.title,
        url: data.data.url,
        thumbnail: data.data.thumbnail,
        ups: data.data.score,
        upvoteRatio: data.data.upvote_ratio,
        comments: data.data.permalink,
        post_hint: data.data.post_hint,
        isGallery: data.data.is_gallery,
        galleryData: data.data.gallery_data,
        subreddit: data.data.subreddit,
        selfText: data.data.selftext,
        hsl_video: data.data.secure_media,
        id: data.data.id,
        created: data.data.created_utc,
        numComments: data.data.num_comments,
      };
    });
    setData(filteredData);
    return () => {};
  }, [props]);

  return (
    <div className="post-container" id="post">
      {data.map((data, index) => {
        return <Card key={index} data={data} />;
      })}
      {
        data.length===0 &&<div>No Posts</div>
      }
    </div>
  );
}
Post.defaultProps = {
  postsData: [],
};
