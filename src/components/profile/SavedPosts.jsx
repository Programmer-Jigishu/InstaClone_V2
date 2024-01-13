import { VStack, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";
import useGetSavedPost from "../../hooks/useGetSavedPost";

function SavedPosts({likeNotSaved}) {
  const { isLoading, posts } = useGetSavedPost(likeNotSaved);
  console.log(posts);
  const noPostsFound = !isLoading && posts.length === 0;

  if (noPostsFound) {
    return (
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        my={4}
        width={"full"}
      >
        <Text>No Posts Found</Text>
      </Flex>
    );
  }

  // Return
  return (
    <Grid
      templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
      gap={2}
      columnGap={1}
      my={4}
      py={4}
      justifyContent={"center"}
    >
      {isLoading ? (
        [1, 2, 3, 4, 5].map((_, idx) => (
          <VStack key={idx} w={"full"} alignItems={"flex-start"}>
            <Skeleton height="250px" w={"full"} />
          </VStack>
        ))
      ) : (
        <>
          {posts.map((post) => (
            <ProfilePost post={post} key={post.id} />
          ))}
        </>
      )}
    </Grid>
  );
}

export default SavedPosts;
