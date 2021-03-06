import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { clearPost, getPost } from "../modules/posts";

function PostContainer({ postId }) {
  const { data, loading, error } = useSelector((state) => state.posts.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
    return () => {
      dispatch(clearPost());
    };
  }, [postId, dispatch]);

  if (loading && !data) return <div>loading...</div>;
  if (error) return <div>Error Occured!</div>;
  if (!data) return null;

  return <Post post={data} />;
}

export default PostContainer;
