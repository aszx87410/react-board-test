import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/postReducer";

export default configureStore({
  reducer: {
    posts: postReducer,
  },
});
