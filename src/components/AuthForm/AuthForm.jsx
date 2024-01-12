import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";
function AuthForm() {
  // const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box padding={2}>
      <Box border={"1px solid gray"}>
        <VStack alignItems={"center"} px={4} gap={4}>
          <Image src="./logo.png" alt="Logo" />
          {isLogin ? <Login /> : <Signup />}

          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            gap={3}
            my={2}
            py={2}
            w={"full"}
          >
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text>OR</Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>

<GoogleAuth isLogin={isLogin}/>
        </VStack>
      </Box>
      <Box border={"1px solid gray"} w={"full"} my={4} py={4}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={1}>
          <Text>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Text>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLogin(!isLogin)}
            fontSize={14}
            colorScheme={"blue"}
            alignItems={"center"}
          >
            {isLogin ? "Sign Up" : "Log In"}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default AuthForm;
