import {
  Box,
  Button,
  CloseButton,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";
import {BsFillImageFill} from "react-icons/bs"
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import usePostStore from "../../store/postStore"
import useUserProfileStore from "../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import useShowToast from "../../hooks/useShowToast";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { fireStore, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import useAuthStore from "../../store/authStore";
const CreatePost = () => {
  const showToast = useShowToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption,setCaption] = useState('')
  const imageRef = useRef(null);
  const {selectedFile,handleImageChange,setSelectedFile} =  usePreviewImg();
  const {handleCreatePost,isLoading} = useCreatePost();

  const handlePostCreation = async()=>{
	try {
		await handleCreatePost(selectedFile,caption)
		onClose();
		setSelectedFile(null);
		setCaption('');
		
	} catch (error) {
		showToast("error",error.message)
		
	}

  }


  return (
    <>
      <Tooltip
        hasArrow
        label={"Create"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
		  onClick={onOpen}
        >
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Flex>
      </Tooltip>
      {/* Modal Here */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent bg={"black"} border={"1px solid gray"}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea placeholder="Post caption..." value={caption} onChange={(e)=>setCaption(e.target.value)} />

            <Input type="file" hidden ref={imageRef} onChange={handleImageChange} />

            <BsFillImageFill
              style={{
                marginTop: "15px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              size={16}
			  onClick={()=>imageRef.current.click()}
            />

			{selectedFile&&
			<Flex width={"full"} justifyContent={"center"} position={"relative"}>

				<Image src={selectedFile} alt = "Selected Image"/>
				<CloseButton position={"absolute"} top={0} right={0} onClick={()=>setSelectedFile(null)} />
			</Flex>
			
			}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>Post</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;


function useCreatePost(){
	const showToast = useShowToast();
	const [isLoading,setIsLoading] = useState(false);
  const userProfile = useUserProfileStore((state) => state.userProfile);
	const authUser = useAuthStore((state) => state.user);
	const createPost = usePostStore(state => state.createPost);
	const addPost = useUserProfileStore((state)=>state.addPost);
	const pathname = useLocation();

	const handleCreatePost = async(selectedFile,caption) => {

    if(isLoading) return;
		if(!selectedFile)throw new Error("Please select an image");
		// if(!caption)throw new Error("Please add a caption")
	setIsLoading(true);
		const newPost = {
			caption :{caption},
			likes:[],
			comments:[],
			createdAt:Date.now(),
			createdBy: authUser?.uid
		};

		try {
			const postDocRef = await addDoc(collection(fireStore, "posts"), newPost);
			const userDocRef = doc(fireStore, "users", authUser?.uid);
			const imageRef = ref(storage, `posts/${postDocRef.id}`);

			await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
			await uploadString(imageRef, selectedFile, "data_url");
			const downloadURL = await getDownloadURL(imageRef);

			await updateDoc(postDocRef, { imageURL: downloadURL });

			newPost.imageURL = downloadURL;

			if (userProfile?.uid === authUser?.uid) createPost({ ...newPost, id: postDocRef.id });

			if (pathname !== "/" && userProfile?.uid === authUser?.uid) addPost({ ...newPost, id: postDocRef.id });

			showToast("Success", "Post created successfully", "success");
		} catch (error) {
			showToast("Error", `${error.message} located in CreatePost`, "error");
		} finally {
			setIsLoading(false);
		}


	}
 return {handleCreatePost,isLoading}

}