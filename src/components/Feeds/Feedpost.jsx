import { Box, Image } from "@chakra-ui/react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import FeedFooter from "./FeedFooter"
import FeedHeader from "./FeedHeader";

const FeedPost = ({ post }) => {
	const { userProfileFetched,isLoading } = useGetUserProfileById(post.createdBy);
  // console.log(userProfileFetched)

	return (
		<Box mb={6} borderRadius={4} padding={2}>
			<FeedHeader post={post} creatorProfile={userProfileFetched} hasLoaded={!isLoading} />
			<Box my={2} borderRadius={4} overflow={"hidden"}>
				<Image src={post.imageURL} alt={"FEED POST IMG"} />
			</Box>
			<FeedFooter post={post} creatorProfile={userProfileFetched} />
		</Box>
	);
};

export default FeedPost;


