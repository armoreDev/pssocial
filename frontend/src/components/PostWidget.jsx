import React, { useState } from "react";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBeteen from "./FlexBetween";
import Friend from "./Friend";
import WidgetWrapper from "./WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../store";
import { useNavigate } from "react-router-dom";

const PostWidget = ({
  key,
  postId,
  userId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  
  const dispath = useDispatch();
  const token = useSelector((state) => state.token);

  const { palatte } = useTheme();
  const primaryLight = palatte.primary.light;
  const primaryDark = palatte.primary.dark;
  const main = palatte.neutral.main;
  const medium = palatte.neutral.medium;

  
  return (
  <div>aaa</div>

  );
};

export default PostWidget;
