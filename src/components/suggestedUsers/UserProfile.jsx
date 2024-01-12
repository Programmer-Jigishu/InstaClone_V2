import { Avatar, Box, Flex, Text, Link, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import useLogOut from "../../hooks/useLogOut";
import useAuthStore from "../../store/authStore";

function UserProfile() {
  const authUser = useAuthStore((state) => state.user);
  const { handleLogout, isLoggingOut, error } = useLogOut();

  return (
    <Box>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        py={1}
        //   borderBottom="1px solid #E2E8F0"
      >
        <Flex alignItems={"center"}>
          <Link
            as={RouterLink}
            to={authUser.userName}
            _hover={{ textDecoration: "none" }}
          >
            <Avatar name={authUser.userName} size={"sm"} src={authUser.profilePic} />
          </Link>
          <Flex direction="column" ml={3}>
            <Link
              as={RouterLink}
              to={authUser.userName}
              fontWeight="bold"
              color="whiteAlpha"
              _hover={{ textDecoration: "none" }}
              fontSize={"sm"}
            >
              {authUser.userName}
            </Link>
            <Text fontSize="xs" color="gray.500">
              * Online
            </Text>
          </Flex>
        </Flex>
        <Button
          isLoading={isLoggingOut}
          px={2}
          color={"blue.500"}
          fontSize={"xs"}
          cursor={"pointer"}
          _hover={{ color: "whiteAlpha", bg: "whiteAlpha.100" }}
          onClick={() => {
            handleLogout();
          }}
        >
          Log Out
        </Button>
      </Flex>
    </Box>
  );
}

export default UserProfile;
