import { Avatar, Flex, Skeleton,Text } from '@chakra-ui/react'
import React from 'react'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'
import timeAgo from '../../assets/timeAgo';

function Caption({post}) {
    const { userProfileFetched, isLoading } = useGetUserProfileById(post.createdBy);

    if (isLoading) {
      return <CommentSkeleton />;
    }

    const timeDiff = timeAgo(post.createdAt);

  return (
    <Flex gap={4} justifyContent={"space-between"} alignItems={"center"}>
      <Avatar
        src={userProfileFetched?.profilePic}
        name={userProfileFetched?.userName}
        size={"sm"}
        alignSelf={"flex-start"}
      />
      <Flex direction={"column"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontWeight={"bold"} fontSize={12} alignSelf={"flex-start"}>
            {userProfileFetched?.userName}
          </Text>
          <Text fontSize={14}>{post.caption.caption}</Text>
        </Flex>
        <Text border={"1px dashed #737373"} color={"gray.300"} fontSize={10}>
          {timeDiff}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Caption


const CommentSkeleton = () => {
    return (
      <Flex gap={4} w={"full"} alignItems={"center"}>
        <Skeleton h={10} w={10} borderRadius="full" />
        <Flex gap={1} flexDir={"column"}>
          <Skeleton h={2} w={100} />
          <Skeleton h={2} w={50} />
        </Flex>
      </Flex>
    );
  };