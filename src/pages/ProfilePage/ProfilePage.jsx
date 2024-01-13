import {
  Box,
  Button,
  Container,
  Flex,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfilePosts from "../../components/profile/ProfilePosts";
import ProfileTabs from "../../components/profile/ProfileTabs";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByName";
import { useParams } from "react-router-dom";
import { Skeleton, SkeletonCircle } from "@chakra-ui/react";
import { BsBookmark, BsGrid3X3, BsSuitHeart } from "react-icons/bs";
import { useState } from "react";
import SavedPosts from "../../components/profile/SavedPosts";
const ProfilePage = () => {
  const { username } = useParams();
  const { isLoading, userProfile } = useGetUserProfileByUsername(username);
  const [tabs, setTabs] = useState("posts");

  const userNotFound = !isLoading && !userProfile;
  console.log("Is Loading: ", isLoading);
  console.log("User Profile: ", userProfile);
  if (userNotFound) return <UserNotFound />;

  return (
    <Container maxW="container.lg" py={5}>
      <Flex
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        w={"full"}
        mx={"auto"}
        flexDirection={"column"}
      >
        {!isLoading && userProfile && <ProfileHeader />}
        {isLoading && <ProfileHeaderSkeleton />}
      </Flex>
      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={"full"}
        mx={"auto"}
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.300"}
        direction={"column"}
      >
        {/* <ProfileTabs /> */}
        <Box mx={"auto"} justifyContent={"center"}>
          <Flex gap={15} justifyContent={"center"}>
            <Flex alignItems={"center"} gap={1} px={5}>
              <Button onClick={() => setTabs("posts")} gap={2} variant={"ghost"}>
                <BsGrid3X3 />
                <Text display={{ base: "none", md: "flex" }}> Posts</Text>
              </Button>
            </Flex>

            <Flex alignItems={"center"} gap={1} px={5}>
              <Button onClick={() => setTabs("saved")} gap={2} variant={"ghost"}>
                <BsBookmark />
                <Text display={{ base: "none", md: "flex" }}> Saved</Text>
              </Button>
            </Flex>

            <Flex alignItems={"center"} gap={1} px={5}>
              <Button onClick={() => setTabs("liked")} gap={2} variant={"ghost"}>
                <BsSuitHeart />
                <Text display={{ base: "none", md: "flex" }}> Liked</Text>
              </Button>
            </Flex>
          </Flex>
        </Box>

        {tabs =="posts" &&<ProfilePosts/>}
        {tabs =="saved" &&<SavedPosts likeNotSaved={false}/>}
        {tabs =="liked" &&<SavedPosts likeNotSaved={true}/>}
		
      </Flex>
    </Container>
  );
};

export default ProfilePage;

// skeleton for profile header
const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SkeletonCircle size="24" />

      <VStack
        alignItems={{ base: "center", sm: "flex-start" }}
        gap={2}
        mx={"auto"}
        flex={1}
      >
        <Skeleton height="12px" width="150px" />
        <Skeleton height="12px" width="100px" />
      </VStack>
    </Flex>
  );
};

const UserNotFound = () => {
  return (
    <Flex flexDir="column" textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2xl"}>User Not Found</Text>
      <Link
        as={RouterLink}
        to={"/"}
        color={"blue.500"}
        w={"max-content"}
        mx={"auto"}
      >
        Go home
      </Link>
    </Flex>
  );
};
