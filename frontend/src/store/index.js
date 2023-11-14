import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: "light",
  user: null,
  profile: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setmode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
      state.profile = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.setFriends = action.payload.friends;
      } else {
        console.log("user friends non-exist");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatePost = state.posts.map((post) => {
        if (post._id === action.payload.post.id) { ///////// post id
          return action.payload.post;
        }
        return post;
      });
      state.posts = updatePost;
    },
    setProfile: (state, action) => {
      state.profile = action.payload.profile;
    },
  },
});

export const {
  setmode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setProfile,
} = authSlice.actions;

export default authSlice.reducer;
