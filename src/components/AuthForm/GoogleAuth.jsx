import { Button, Flex, Image, Text } from "@chakra-ui/react";
import useGoogleSignIn from "../../hooks/useGoogleSignIn";
import { Alert, AlertIcon } from "@chakra-ui/react";
function GoogleAuth({ isLogin }) {
  const { handleGoogleSignIn, loading, error } = useGoogleSignIn();
  return (
    <>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <Button
        isLoading={loading}
        onClick={() => handleGoogleSignIn(isLogin)}
        background={"transparent"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={3}
        cursor={"pointer"}
        mb={4}
        py={2}
      >
        <Image w={7} padding={1} src="./google.png" />
        <Text color={"blue.500"}>
          {isLogin ? "Log In" : "Sign Up"} with Google
        </Text>
      </Button>
    </>
  );
}

export default GoogleAuth;
