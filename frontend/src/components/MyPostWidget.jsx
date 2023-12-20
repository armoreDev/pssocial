import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutline,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "./UserImage";
import WidgetWrapper from "./WidgetWrapper";
import { addPosts } from "../store";
import { useDispatch, useSelector } from "react-redux";

function MyPostWidget({ picturePath }) {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const medieumMain = palette.neutral.mediumMain;
  const meduim = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:8887/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(addPosts({ posts }));
    setImage(null);
    setPost("");
  };
  return (
    <WidgetWrapper>
      {/* Input text Field */}
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            padding: "1rem 2rem",
            borderRadius: "2rem",
          }}
        />
      </FlexBetween>
      {/* if toglle button Image */}
      {isImage && (
        <Box
          border={`1px solid ${meduim}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => {
              return (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { corsor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p> Add Image Here!</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "10%" }}
                    >
                      <DeleteOutline />
                    </IconButton>
                  )}
                </FlexBetween>
              );
            }}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.5rem" }} />
      <FlexBetween>
        <FlexBetween gap=".25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: medieumMain }} />
          <Typography
            color={medieumMain}
            sx={{ "&:hover": { cursor: "pointer", color: meduim } }}
          >
            Image
          </Typography>
        </FlexBetween>
        {isNonMobileScreen ? (
          <>
            <FlexBetween gap=".25rem">
              <GifBoxOutlined sx={{ color: medieumMain }} />
              <Typography
                color={medieumMain}
                sx={{ "&:hover": { cursor: "pointer", color: meduim } }}
              >
                Clip
              </Typography>
            </FlexBetween>
            <FlexBetween gap=".25rem">
              <AttachFileOutlined sx={{ color: medieumMain }} />
              <Typography
                color={medieumMain}
                sx={{ "&:hover": { cursor: "pointer", color: meduim } }}
              >
                Attachment
              </Typography>
            </FlexBetween>
            <FlexBetween gap=".25rem">
              <MicOutlined sx={{ color: medieumMain }} />
              <Typography
                color={medieumMain}
                sx={{ "&:hover": { cursor: "pointer", color: meduim } }}
              >
                Audio
              </Typography>
            </FlexBetween>
          </>
        ) : (
          <>
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: medieumMain }} />
            </FlexBetween>
          </>
        )}
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          Post
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
}

export default MyPostWidget;
