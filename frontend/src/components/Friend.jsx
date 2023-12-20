import React from "react";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import PersonRemoveAlt1OutlinedIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../store";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.friend);

  const { palatte } = useTheme();
  const primaryLight = palatte.primary.light;
  const primaryDark = palatte.primary.dark;
  const main = palatte.neutral.main;
  const medium = palatte.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);
  const PatchFriend = async () => {
    const response = await fetch(`http://localhost:8887/${_id}/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispath(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0)
          }}
        >
            <Typography
                color={main}
                variant="h5"
                fontWeight="500"
                sx={{
                    "&hover":{
                        color:palatte.primary.light,
                        cursor:'pointer'

                    }
                }}
            >
                {name}
            </Typography>
            <Typography 
                color={medium}
                fontSize="0.75rem"
            >
                {subtitle}
            </Typography>
        
        </Box>
        <IconButton 
            onClick={() => PatchFriend()} 
            sx={{
                backgroundColor:primaryLight,
                p:"0.6rem"

            }}
        >
            {isFriend?(
                <PersonAddAlt1OutlinedIcon sx={{color : primaryDark}} />
                
            ):<PersonRemoveAlt1OutlinedIcon sx={{color : primaryDark}} />
            
            }
        </IconButton>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Friend;
