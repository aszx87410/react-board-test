import { createSlice } from "@reduxjs/toolkit";
import { getPost as getPostAPI, createPost } from "../../WebAPI";

export const postReducer = createSlice({
  name: "posts",
  initialState: {
    isLoadingPost: false,
    post: null,

    isLoadingNewPost: false,
    newPostResponse: null,
  },
  reducers: {
    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload;
    },

    setPost: (state, action) => {
      state.post = action.payload;
    },

    setIsLoadingNewPost: (state, action) => {
      state.isLoadingNewPost = action.payload;
    },

    setNewPostResponse: (state, action) => {
      state.newPostResponse = action.payload;
    },
  },
});

export const {
  setIsLoadingPost,
  setPost,
  setNewPostResponse,
  setIsLoadingNewPost,
} = postReducer.actions;

export const getPost = (id) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  getPostAPI(id)
    .then((res) => {
      dispatch(setPost(res));
      dispatch(setIsLoadingPost(false));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const newPost = (data) => (dispatch) => {
  dispatch(setIsLoadingNewPost(true));
  return createPost(data).then((res) => {
    dispatch(setNewPostResponse(res));
    dispatch(setIsLoadingNewPost(false));
    return res;
  });
};

export default postReducer.reducer;
