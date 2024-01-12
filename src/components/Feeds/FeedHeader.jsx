import {
  Avatar,
  Flex,
  Text,
  Link,
  IconButton,
  VStack,
  useDisclosure,
  Button,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { RiMoreFill } from "react-icons/ri";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser";

import timeAgo from "../../assets/timeAgo";

function FeedHeader({ post, creatorProfile, hasLoaded }) {
  // console.log("Inside FeedHeader", creatorProfile);
  const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(
    post.createdBy
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const actionSome = () => {
    console.log("Action is Done.");
  };

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      py={4}
      borderBottom="1px solid #E2E8F0"
    >
      <Flex alignItems={"center"}>
        {hasLoaded ? (
          <>
            <Avatar size={"md"} src={creatorProfile?.profilePic} />
            <Flex direction="column" ml={3}>
              <Link
                as={RouterLink}
                to={`/${creatorProfile?.userName}`}
                fontWeight="bold"
                color="blue.500"
                _hover={{ textDecoration: "none" }}
              >
                {creatorProfile?.userName}
              </Link>

              <Text fontSize={12} color="gray.500">
                {timeAgo(post.createdAt)}
              </Text>
            </Flex>
          </>
        ) : (
          <Skeleton height="40px" width="40px" />
        )}
      </Flex>

      <Flex alignItems={"center"}>
        <IconButton
          icon={<RiMoreFill />}
          variant="ghost"
          aria-label="More"
          fontSize="20px"
          onClick={onOpen}
        />
        {/* When The Icon Button is Clicked This Modal Pops Up */}
        <Modal isOpen={isOpen} onClose={onClose} border={"1px solid white"}>
          <ModalOverlay />
          <ModalContent w={"100%"} mx={0} borderRadius={15}>
            <ModalBody
              w={"100%"}
              margin={0}
              backgroundColor={"gray.900"}
              padding={0}
              borderRadius={15}
            >
              <VStack
                width={"100%"}
                alignItems={"center"}
                spacing={0}
                py={0}
                my={0}
              >
                <Button
                  w="full"
                  borderBottom={"1px solid #E2E8F0"}
                  py={2}
                  textAlign="center"
                  cursor="pointer"
                  _hover={{ bg: "whiteApple.200" }}
                  isLoading={isUpdating}
                  onClick={handleFollowUser}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
                <Button
                  width={"100%"}
                  onClick={actionSome}
                  borderBottom={"1px solid #E2E8F0"}
                  py={2}
                  textAlign="center"
                  cursor="pointer"
                  _hover={{ bg: "whiteApple.200" }}
                  isActive={false}
                >
                  Coming Soon ...
                </Button>
                <Button
                  width={"100%"}
                  borderBottom={"1px solid #E2E8F0"}
                  py={2}
                  textAlign="center"
                  cursor="pointer"
                  _hover={{ bg: "whiteApple.200" }}
                  color={"red"}
                >
                  <Link
                    as={RouterLink}
                    to={`mailto:${import.meta.env.VITE_MAILADDRESS}`}
                  >
                    Report
                  </Link>
                </Button>
                <Button
                  width={"100%"}
                  onClick={onClose}
                  py={2}
                  textAlign="center"
                  cursor="pointer"
                  _hover={{ bg: "whiteApple.200" }}
                  color={"red"}
                >
                  Close
                </Button>
                {/* Add more Box components for each action */}
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
        {/* Modal Ending */}
      </Flex>
    </Flex>
  );
}

export default FeedHeader;
