import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "../store";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispath = useDispatch();
  const posts = useSelector((state) => state.post);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(`http://localhost:8887/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispath(setPosts({ posts: data }));
  };
  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:8887/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispath(setPost({ posts: data }));
  };
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);
  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            userId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
