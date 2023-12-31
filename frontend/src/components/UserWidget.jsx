import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "./UserImage";
import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWiddget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:8887/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;
  return (
    <WidgetWrapper>
      {/* first row */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>
              {friends.length === 0
                ? Math.floor(Math.random() * 100)
                : friends.length}{" "}
              friends
            </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />
      {/* second row */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap=".5rem" mb=".5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap=".5rem" mb=".5rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      <Divider />
      {/* third row */}
      <Box p="1rem 0">
        <FlexBetween gap=".5rem" mb=".5rem">
          <Typography color={medium}>Who's views your profile</Typography>
          <Typography sx={{ color: main, fontWeight: "500" }}>
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween gap=".5rem" mb=".5rem">
          <Typography color={medium}>Who's views your profile</Typography>
          <Typography sx={{ color: main, fontWeight: "500" }}>
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />
      {/* forth row */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem" mb=".5rem">
          <Box display="flex" gap="1rem">
            <TwitterIcon fontSize="large" />
            <Box>
              <Typography color={main}>Twitter</Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </Box>
          <EditOutlined />
        </FlexBetween>
        <FlexBetween gap="1rem">
          <Box display="flex" gap="1rem">
            <LinkedInIcon fontSize="large" />
            <Box>
              <Typography color={main}>LinkedIn</Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </Box>
          <EditOutlined />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};
export default UserWiddget;
