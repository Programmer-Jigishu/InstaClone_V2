import { Container, Flex, Box } from "@chakra-ui/react";
import React from "react";
import Feedposts from "../../components/Feeds/Feedposts";
import SuggestedUsers from "../../components/suggestedUsers/SuggestedUsers";

function HomePage() {
  return (
    <Container minH={"100vh"} maxW={"container.lg"} py={10} pr={0} ml={10} mr={1}>
      <Flex
        justifyContent={"center"}
        // alignItems={"center"}
        height={"100%"}
        gap={10}
      >
        <Box flex={3} justifyContent={"center"}>
          <Box px = {10} mx={10}>
          <Feedposts />
          </Box>
        </Box>


        <Box
          // height={"40vh"}
          flex={2}
          // backgroundColor={"green"}
          display={{ base: "none", lg: "block" }}
          ml={10}
          px={0}
        >
          <SuggestedUsers/>
        </Box>
      </Flex>
    </Container>
  );
}

export default HomePage;
