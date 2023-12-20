import React from "react";
import NavBar from "./NavBar";
import UserWiddget from "./UserWidget";
import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import MyPostWidget from './MyPostWidget'
function Home() {
  const isNonMobileScreeen = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user);
  const { _id, picturePath } = user;

  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreeen ? "flex" : "block"}
        gap=".5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreeen ? "26%" : undefined}>
          <UserWiddget userId={_id} picturePath={picturePath} />
        </Box>
        <Box 
         flexBasis={isNonMobileScreeen ? "42%" : undefined} 
         mt={isNonMobileScreeen? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath}/>
        </Box>
        {isNonMobileScreeen && (
          <Box 
          flexBasis={isNonMobileScreeen ? "26%" : undefined} 
          mt={isNonMobileScreeen? undefined : "2rem"}
 
         >
           Friend
         </Box>
        )}
      </Box>
    </Box>
  );
}

export default Home;
