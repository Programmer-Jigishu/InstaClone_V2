import { Box, Flex ,Text} from '@chakra-ui/react'
import React from 'react'
import {BsBookmark, BsGrid3X3, BsSuitHeart} from "react-icons/bs";

function ProfileTabs() {
  return (
    <Box mx={"auto"} justifyContent={"center"}>
      <Flex gap={15} justifyContent={"center"}>

        <Flex alignItems={"center"} gap={1} px={5} >
          <BsGrid3X3/>
          <Text display={{base:"none",md:"flex"}}> Posts</Text>
        </Flex>

        <Flex alignItems={"center"} gap={1} px={5}>
          <BsBookmark/>
          <Text display={{base:"none",md:"flex"}}> Saved</Text>
        </Flex>

        <Flex alignItems={"center"} gap={1} px={5}>
          <BsSuitHeart/>
          <Text display={{base:"none",md:"flex"}}> Tagged</Text>
        </Flex>
        
      </Flex>
    </Box>
  )
}

export default ProfileTabs