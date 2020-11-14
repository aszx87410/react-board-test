import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { newPost } from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 500px;
  margin-top: 16px;
`;

const TitleInput = styled.input``;

const Button = styled.button`
  color: rgba(0, 0, 0, 0.8);
`;

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const history = useHistory();
  const isLoadingNewPost = useSelector((store) => store.posts.isLoadingNewPost);
  const newPostResponse = useSelector((store) => store.posts.newPostResponse);
  const dispatch = useDispatch();
  const prevIsLoadingNewPost = usePrevious(isLoadingNewPost);

  const handleSubmit = () => {
    dispatch(
      newPost({
        title,
        body,
      })
    );
  };

  useEffect(() => {
    if (!isLoadingNewPost && prevIsLoadingNewPost)
      if (newPostResponse && newPostResponse.id) {
        history.push("/posts/" + newPostResponse.id);
      }
  }, [newPostResponse, history, isLoadingNewPost, prevIsLoadingNewPost]);

  return (
    <Root>
      <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
      <Textarea onChange={(e) => setBody(e.target.value)}>{body}</Textarea>
      <Button onClick={handleSubmit}>新增文章</Button>
    </Root>
  );
}
