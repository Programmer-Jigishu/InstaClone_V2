import { Flex, Text, Link} from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom";
import React from "react";
import SuggestedUser from "./SuggestedUser";
import UserProfile from "./UserProfile";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

function SuggestedUsers() {
  const {isLoading,suggestedUsers} = useGetSuggestedUsers()

  if (isLoading) return null


  return (
    <Flex w={"full"} mx={0} px={10} direction={"column"}> 
      <Flex gap={2} direction={"column"}>
      {/* Own Profile */}
        
        <UserProfile/>
        {suggestedUsers.length!==0&& <Flex justifyContent={"space-between"} alignItems={"center"}>

      <Text>Suggested Users : </Text>
      <Text color={"blue.500"} fontSize={"xs"} cursor={"pointer"} _hover={{color:"whiteAlpha",bg:"whiteAlpha.100"}} onClick={() => console.log("See All")}>See All</Text>
        </Flex>}
      {/* All Users */}
        
        {suggestedUsers.map((user) => (
          <SuggestedUser key={user.id} user={user} />
        ))}

        {/* EXTRA Links */}
        <Text>Made with ❤️ by
        <Link href={"https://www.linkedin.com/in/jigishu-bhadviya-988a04121"} color={"blue.500"} fontWeight={"bold"} cursor={"pointer"} _hover={{color:"whiteAlpha",bg:"whiteAlpha.100"}}> Jigishu</Link>
        </Text>
      </Flex>
    </Flex>
  );
}

export default SuggestedUsers;
