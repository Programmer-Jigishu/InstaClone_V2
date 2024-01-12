import React, { useRef } from "react";
import { Box, Flex, Input, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaComment,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { InputGroup, InputRightElement } from "@chakra-ui/react";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";

function ProfilePostFooter({ post, userName, isProfilePage }) {
  const { handlePostComment, isCommenting } = usePostComment();
  const [comment, setComment] = useState("");
  const authUser = useAuthStore((state) => state.user);
  // const [isLiked, setIsLiked] = useState(false);
  // const [likes, setLikes] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

const {handleLikes,isUpdating,likes,isLikedByUser}= useLikePost(post);

  const commentRef = useRef(null);

  const handleSubmitComment = async () => {
    console.log("Post from post footer :", post);
    console.log("Post Id from post footer :", post.id);
    await handlePostComment(post?.id, comment);

    setComment("");
  };

  return (
    <Flex direction={"column"} pt={10}>
      <Flex justifyContent={"space-between"} py={3}>
        <Flex gap={5}>
          <Box
            onClick={handleLikes}
            cursor={"pointer"}
            isLoading={isUpdating}
          >
            {!isLikedByUser ? <FaRegHeart /> : <FaHeart color="red" />}
          </Box>
          <Box
            _hover={{ color: "blue.500" }}
            cursor={"pointer"}
            onClick={() => commentRef.current.focus()}
          >
            <FiSend />
          </Box>
        </Flex>

        <Box
          onClick={() => {
            setIsSaved(!isSaved);
          }}
        >
          {!isSaved ? <FaRegBookmark /> : <FaBookmark />}
        </Box>
      </Flex>
      <Box>{`${likes} Likes`}</Box>

      {authUser && (
        <InputGroup size="md">
          <Input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            pr="4.5rem"
            placeholder="Comment on this post"
            fontSize={14}
            ref={commentRef}
          />
          <InputRightElement width="4.5rem">
            <Button
              fontSize={14}
              h="1.75rem"
              size="sm"
              onClick={handleSubmitComment}
              isLoading={isCommenting}
            >
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      )}
    </Flex>
  );
}

export default ProfilePostFooter;
