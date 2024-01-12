import { useEffect, useState } from "react"
import useGetUserProfileById from "./useGetUserProfileById"
import usePostStore from "../store/postStore"
import useAuthStore from "../store/authStore"
import useUserProfileStore from "../store/userProfileStore"
import useShowToast from "./useShowToast"
import { collection, getDocs, query, where } from "firebase/firestore"
import { fireStore } from "../firebase/firebase"

function useGetFeedPost() {
  const [isLoading, setIsLoading] = useState(false);
  const { posts, setPosts } = usePostStore();
  const authUser = useAuthStore((state) => state.user);
  const { setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();


  useEffect(() => {
    const getFeedPost = async () => {

      setIsLoading(true);

      if(authUser.following.length === 0){
        setIsLoading(false);
        setPosts([]);
        return
      }

      const q = query(collection(fireStore,"posts"),where("createdBy","in",authUser.following))
      try {
        const querySnapshot = await getDocs(q);
        const feedPosts= [];

        querySnapshot.forEach((doc) => {
          feedPosts.push({ ...doc.data(), id: doc.id })
        })

        feedPosts.sort((a, b) => b.createdAt - a.createdAt)

        setPosts(feedPosts)

      } catch (error) {
        showToast("Error", error.message, "error")
      } finally {
        setIsLoading(false);
      }
    }


    if (authUser) getFeedPost();

  }, [authUser,showToast,setPosts,setUserProfile]);

  // useGetUserProfileById

  return {isLoading,posts}
}

export default useGetFeedPost