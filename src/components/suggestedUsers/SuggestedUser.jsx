import {
  Text,
  Box,
  Flex,
  Link,
  Avatar,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { RiChatFollowUpFill, RiUserFollowFill } from "react-icons/ri";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";
function SuggestedUser({ user, setSearchUser }) {
  const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(
    user?.uid
  );
  const authUser = useAuthStore((state) => state.user);

  const onFollowUser = async () => {
    await handleFollowUser();
    setSearchUser({
      ...user,
      followers: isFollowing
        ? user.followers.filter((f) => f !== authUser.uid)
        : [...user.followers, authUser.uid],
    });
  };

  console.log({ User: user, AuthUser: authUser });
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
            to={`/${user?.userName}`}
            fontWeight="bold"
            color="whiteAlpha"
            _hover={{ textDecoration: "none" }}
            fontSize={"sm"}
          >
            <Avatar size={"sm"} src={user?.profilePic} />
          </Link>
          <Flex direction="column" ml={3}>
            <Link
              as={RouterLink}
              to={`/${user?.userName}`}
              fontWeight="bold"
              color="whiteAlpha"
              _hover={{ textDecoration: "none" }}
              fontSize={"sm"}
            >
              {user?.userName}
            </Link>
            <Text fontSize="xs" color="gray.500">
              {user?.fullName}
            </Text>
            <Flex gap={4}>
              <Tooltip
                backgroundColor={"blackAlpha.700"}
                color={"whiteAlpha.700"}
                label="Followers"
                placement="bottom"
              >
                <Text fontSize={14} display={"flex"} alignItems={"center"}>
                  {user?.followers.length}
                  <RiChatFollowUpFill />
                </Text>
              </Tooltip>
              <Tooltip
                backgroundColor={"blackAlpha.700"}
                color={"whiteAlpha.700"}
                label="Following"
                placement="bottom"
              >
                <Text fontSize={14} display={"flex"} alignItems={"center"}>
                  {user?.following.length}
                  <RiUserFollowFill />
                </Text>
              </Tooltip>
            </Flex>
          </Flex>
        </Flex>
        {authUser?.uid !== user.uid && (
          <Button
            px={2}
            color={"blue.500"}
            fontSize={"xs"}
            hover={{ color: "whiteAlpha", bg: "whiteAlpha.100" }}
            onClick={onFollowUser}
            isLoading={isUpdating}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </Flex>
    </Box>
  );
}

export default SuggestedUser;
