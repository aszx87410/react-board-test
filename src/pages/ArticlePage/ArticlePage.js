import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { useParams, useHistory } from "react-router-dom";
import { removePost } from "../../WebAPI";
import { getPost } from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  padding: 16px;
`;

const PostTitle = styled.h1``;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

const PostBody = styled.p`
  white-space: pre-wrap;
`;

const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 24px;
  background: rgba(0, 0, 0, 0.3);
`;

function Post({ post, onDelete }) {
  if (!post) return null;
  return (
    <PostContainer>
      <button onClick={onDelete}>刪除</button>
      <PostTitle>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
      <PostBody>{post.body}</PostBody>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default function ArticlePage() {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.posts.isLoadingPost);
  const post = useSelector((store) => store.posts.post);

  const handleDelete = () => {
    removePost(id).then(() => {
      history.push("/");
    });
  };

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  return (
    <Root>
      <Post post={post} onDelete={handleDelete} />
      {isLoading && <Loading>載入中</Loading>}
    </Root>
  );
}
