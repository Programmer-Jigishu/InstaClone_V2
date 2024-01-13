import {
  Box,
  Flex,
  Input,
  Text,
  Button,
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  Avatar,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaComment,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { InputGroup, InputRightElement } from "@chakra-ui/react";
import { useRef } from "react";
import useLikePost from "../../hooks/useLikePost";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import { useDisclosure } from "@chakra-ui/react";
import { Modal, ModalBody, Divider, VStack } from "@chakra-ui/react";
import { RiMore2Fill } from "react-icons/ri";
import Caption from "../profile/Caption";
import Comments from "../profile/Comments";
import ProfilePostFooter from "../profile/ProfilePostFooter";
import useAddToSavedPosts from "../../hooks/useAddToSavedPosts";

function FeedFooter({ post, creatorProfile, isOpen,onOpen,onClose }) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const lastCommentRef = useRef(null);

  const { isLoading, isSaved, addToSavePost } = useAddToSavedPosts(post.id);

  const { handlePostComment, isCommenting } = usePostComment();
  const authUser = useAuthStore((state) => state.user);

  const { handleLikes, isUpdating, likes, isLikedByUser } = useLikePost(post);

  const scrollToBottom = () => {
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleSubmitComment = async () => {
    console.log("Post from post footer :", post);
    console.log("Post Id from post footer :", post.id);
    await handlePostComment(post?.id, comment);

    setComment("");
  };

  const [comment, setComment] = useState("");
  const [displayFullComment, setDisplayFullComment] = useState(false);
  const lengthOfCaption = post.caption.caption.length;
  const commentRef = useRef(null);
  return (
    <Flex direction={"column"}>
      <Flex justifyContent={"space-between"} py={3}>
        <Flex gap={5} alignItems={"center"}>
          <Button size={"xs"} onClick={handleLikes} isLoading={isUpdating}>
            {!isLikedByUser ? <FaRegHeart /> : <FaHeart color="red" />}
          </Button>
          <Box
            onClick={() => commentRef.current.focus()}
            variant={"ghost"}
            size={"xs"}
            _active={{ bg: "whiteAlpha.800", color: "black" }}
          >
            <FaComment />
          </Box>
          <FiSend />
        </Flex>
        <Button size={"xs"} onClick={addToSavePost} isLoading={isLoading}>
          {!isSaved ? <FaRegBookmark /> : <FaBookmark />}
        </Button>
      </Flex>
      <Text>{`${likes} Likes`}</Text>
      <Flex justifyContent={"space-between"}>
        <Text flex={0.85}>
          {`${creatorProfile?.userName}: ${
            displayFullComment
              ? post.caption.caption
              : post.caption.caption.slice(0, 35)
          }`}{" "}
        </Text>{" "}
        {lengthOfCaption > 35 && (
          <Button
            size={"xs"}
            flex={0.15}
            variant={"ghost"}
            onClick={() => setDisplayFullComment(!displayFullComment)}
          >
            {displayFullComment ? "View Less" : "View More"}
          </Button>
        )}
      </Flex>
      {post?.comments.length > 0 && (
        <Box
          onClick={onOpen}
          _hover={{
            cursor: "pointer",
            color: "blue.500",
            textDecoration: "bold",
          }}
        >{`View ${post.comments.length} comments`}</Box>
      )}

      <InputGroup size="md">
        <Input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          pr="4.5rem"
          placeholder="Comment on this post"
          ref={commentRef}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleSubmitComment}>
            Post
          </Button>
        </InputRightElement>
      </InputGroup>

      {/* MODAL IS HERE */}
      <Modal
        isCentered={true}
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "3xl", md: "4xl" }}
        mx={"auto"}
      >
        {isOpen && scrollToBottom()}
        <ModalOverlay backgroundColor={"whiteAlpha.100"}>
          <Box
            position={"absolute"}
            right={5}
            top={5}
            cursor={"pointer"}
            _hover={{ backgroundColor: "white" }}
            zIndex={"auto"}
          >
            <ModalCloseButton />
          </Box>
        </ModalOverlay>
        {/* Headers */}
        <ModalContent backgroundColor={"black"}>
          {/* Body */}
          <ModalBody mx={"auto"}>
            <Flex
              gap={4}
              width={{ base: "90%", sm: "70%", md: "full" }}
              height={{ base: "90%", sm: "70%", md: "full" }}
              justifyContent={"center"}
              maxH={"90vh"}
              minH={"50vh"}
            >
              <Flex flex={1.5} justifyContent={"center"} alignItems={"center"}>
                <Image src={post.imageURL} />
              </Flex>
              <Flex
                flex={1}
                direction={"column"}
                display={{ base: "none", md: "flex" }}
              >
                {/* Profile Name */}
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Flex gap={2}>
                    <Avatar
                      src={creatorProfile?.profilePic}
                      size={"xs"}
                      alt={creatorProfile?.userName}
                    />
                    <Text>{creatorProfile?.userName}</Text>
                  </Flex>
                  <Flex borderRadius={4} gap={6} fontSize={24}>
                    {authUser?.uid === creatorProfile?.uid && (
                      <Flex
                        onClick={handleDeletePost}
                        cursor={"pointer"}
                        _hover={{ bg: "whiteAlpha.200" }}
                      >
                        <MdDelete color="red" />
                      </Flex>
                    )}

                    <Flex
                      onClick={() => {
                        console.log("clicked More in Modal");
                      }}
                      cursor={"pointer"}
                      _hover={{ bg: "whiteAlpha.200" }}
                    >
                      <RiMore2Fill />
                    </Flex>
                  </Flex>
                </Flex>
                <Divider
                  orientation="horizontal"
                  my={4}
                  borderColor={"whiteAlpha.300"}
                />
                {/* Comments */}
                <VStack
                  alignItems={"start"}
                  spacing={{ base: 2, md: 4 }}
                  maxH={"45vh"}
                  overflowY={"auto"}
                  my={2}
                  ref={lastCommentRef}
                >
                  {/* Captions */}
                  <Caption post={post} />
                  {/* Comments */}
                  <Divider />
                  <Text
                    fontSize={18}
                    fontWeight={"bold"}
                    fontFamily={"cursive"}
                  >
                    Comments .
                  </Text>

                  {post.comments.map((comment) => (
                    <Comments key={comment.id} comment={comment} />
                  ))}

                  {/* <Comments
                  username="lorem.10"
                  text="Something"
                  commentedAt="1D Ago"
                  profilePic="https://images.pexels.com/photos/3737018/pexels-photo-3737018.jpeg"/>
                  <Comments
                  username="lorem.10"
                  text="Something kughsvk ijg vugniowgoiug s mj09rrugjsajgo jpsg s9jgu sp gij- sidf0 visjjag skj gposfi"
                  commentedAt="1D Ago"
                  profilePic="https://images.pexels.com/photos/3737018/pexels-photo-3737015.jpeg"/>
                  <Comments
                  username="lorem.10"
                  text="Something"
                  commentedAt="1D Ago"
                  profilePic="https://images.pexels.com/photos/3737018/pexels-photo-3737018.jpeg"/> */}
                </VStack>
                <Divider
                  orientation="horizontal"
                  my={4}
                  borderColor={"whiteAlpha.300"}
                />
                <ProfilePostFooter
                  post={post}
                  userName={creatorProfile?.userName}
                  isProfilePage={false}
                />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Modal Ended Here */}
    </Flex>
  );
}

export default FeedFooter;
