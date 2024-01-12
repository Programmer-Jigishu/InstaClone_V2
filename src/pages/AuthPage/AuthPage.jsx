import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
function AuthPage() {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
          {/* Left hand Side */}
          <Box display={{ base: "none", md: "block" }}>
            <Image src="./auth.png" h={600} alt="Phone Image" />
          </Box>
          {/* Form (Right hand Side) */}
          <VStack spacing={4} align={"stretch"}>
            <AuthForm />
            <Box textAlign={"center"}>Get The App!</Box>
            <Flex gap={5} justifyContent={"center"}>
              <Image src="./playstore.png" h={10} alt="Stores" />
              <Image src="./microsoft.png" h={10} alt="Stores" />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
}

export default AuthPage;
