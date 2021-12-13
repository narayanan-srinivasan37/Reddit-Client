import React, { useEffect, useState } from "react";

import Card from "../Card/Card";
import '../Post/Post.css'
export default function SinglePost(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await props.postData;
      const filteredData = await data.map((data, index) => {
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
    };
    fetchData();
    return () => {};
  }, [props]);
  return (
    <div style={{width:'100%'}} id="post">
      {data.map((data, index) => {
        return <Card nolink key={index} data={data} />;
      })}
    </div>
  );
}
