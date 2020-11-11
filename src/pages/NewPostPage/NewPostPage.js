import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { createPost } from "../../WebAPI";

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

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    createPost({
      title,
      body,
    }).then((data) => {
      console.log(data);
      if (data.id) {
        history.push("/posts/" + data.id);
      }
    });
  };

  return (
    <Root>
      <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
      <Textarea onChange={(e) => setBody(e.target.value)}>{body}</Textarea>
      <Button onClick={handleSubmit}>新增文章</Button>
    </Root>
  );
}
