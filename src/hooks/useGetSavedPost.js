import { useEffect, useState } from 'react'
import usePostStore from '../store/postStore'
import useShowToast from './useShowToast'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { fireStore } from '../firebase/firebase';
import useAuthStore from '../store/authStore';
function useGetSavedPost(likeNotSaved) {
    const [isLoading, setIsLoading] = useState(false);
    const { setPosts, posts } = usePostStore();
    const showToast = useShowToast();
    const authUser = useAuthStore((state) => state.user);


    useEffect(() => {
        const getPosts = async () => {
            if (!authUser) return;

            setIsLoading(true);
            setPosts([]);

            try {
                const q = query(collection(fireStore, "posts"));
                const querySnapshot = await getDocs(q);

                const posts = [];
                querySnapshot.forEach((doc) => {
                    if (authUser.savedPosts.includes(doc.id) && !likeNotSaved) {
                        posts.push({ ...doc.data(), id: doc.id })
                    }

                    if (doc.data().likes.includes(authUser.uid) && likeNotSaved) {
                        posts.push({ ...doc.data(), id: doc.id })
                    }
                })

                posts.sort((a, b) => b.createdAt - a.createdAt)

                setPosts(posts);

            } catch (error) {
                showToast("Error", error.message, "error");
                setPosts([])
            } finally {
                setIsLoading(false);
            }
        }

        getPosts();
    }, [setPosts, authUser, showToast])


    return { isLoading, posts };
}

export default useGetSavedPost;