import React from "react";
import { Avatar, Flex, Text, Box, Button } from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import { FaUserEdit } from "react-icons/fa";
import ModalComponent from "./ModalComponent";
import { useDisclosure } from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser";


function ProfileHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authUser = useAuthStore((state) => state.user);
  const { userProfile } = useUserProfileStore();
  const userOnTheirOwnPage =
    authUser && authUser.userName === userProfile.userName;

  const{isUpdating,isFollowing,handleFollowUser} = useFollowUser(userProfile?.uid);

  return (
    <Flex
      gap={{ base: 4, sm: 6 }}
      direction={{ base: "column", sm: "row" }}
      ml={4}
      justifyContent={{ base: "flex-start" }}
      alignItems={"center"}
      my={6}
    >
      <Box px={5}>
        <Avatar
          size={"2xl"}
          src={userProfile?.profilePic ? userProfile.profilePic : null}
        />
      </Box>
      <Flex px={5} display={{ base: "flex", sm: "none" }}>
        <Text fontWeight={"bold"} fontSize={"xl"}>
          {userProfile?.userName}
        </Text>
      </Flex>
      <Flex
        mx={4}
        direction={"column"}
        gap={4}
        justifyContent={{ base: "center", sm: "flex-start" }}
        alignItems={"center"}
      >
        <Flex
          width={"full"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <Text
            fontWeight={"bold"}
            fontSize={"xl"}
            display={{ base: "none", sm: "flex" }}
          >
            {userProfile?.userName}
          </Text>
          {userOnTheirOwnPage ? (
            <Button size={"xs"} gap={1} onClick={()=>onOpen()}>
              <FaUserEdit />
              <Text fontStyle={"bold"} fontSize={12}>

              Edit
              </Text>
            </Button>
          ):
          authUser?.uid?<Button size={"xs"} onClick={handleFollowUser} isLoading={isUpdating}>
            <Text fontStyle={"bold"} fontSize={12}>

            {isFollowing?"Unfollow":"Follow"}
            </Text>
            </Button>:null}
        </Flex>
        <Flex gap={{ base: 4, sm: 10 }}>
          <Text>{`${userProfile.posts.length} Posts`}</Text>
          <Text>{`${userProfile.followers.length} Followers`}</Text>
          <Text>{`${userProfile.following.length} Followings`}</Text>
        </Flex>
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text fontWeight={"bold"}>{userProfile.fullName}</Text>

          <Text fontSize={"sm"} border="1px dashed #737373" mt={1}>
            {userProfile.bio || "My Status is Null."}{" "}
          </Text>
        </Flex>
      </Flex>
      {/* Modal Component Call */}
      {isOpen&&<ModalComponent isOpen={isOpen} onClose={onClose}/>}
    </Flex>
  );
}

export default ProfileHeader;

// default props values
ProfileHeader.defaultProps = {
  avatar: "/default-avatar.png",
  username: "JohnDoe",
};
