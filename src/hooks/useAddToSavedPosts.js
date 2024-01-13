import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { fireStore } from '../firebase/firebase';
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';

function useAddToSavedPosts(postId) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();
    const setAuthUser = useAuthStore((state) => state.setUser);

    useEffect(() => {
        // Ensure authUser.savedPosts is an array
        const savedPosts = authUser?.savedPosts || [];
        const isSaved = savedPosts.includes(postId);
        setIsSaved(isSaved);
    }, [authUser, postId])

    const addToSavePost = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const currentUserRef = doc(fireStore, "users", authUser.uid);

            // Ensure authUser.savedPosts is an array
            const savedPosts = authUser?.savedPosts || [];

            await updateDoc(currentUserRef, {
                savedPosts: isSaved ? arrayRemove(postId) : arrayUnion(postId)
            });

            if (isSaved) {
                setAuthUser({
                    ...authUser,
                    savedPosts: savedPosts.filter((id) => id !== postId)
                });

                localStorage.setItem("user-info", JSON.stringify({
                    ...authUser,
                    savedPosts: savedPosts.filter((id) => id !== postId)
                }));
                
            showToast("Success", "Removed from Saved Posts", "info");

                setIsSaved(false);
            } else {
                setAuthUser({
                    ...authUser,
                    savedPosts: [...savedPosts, postId]
                });

                localStorage.setItem("user-info", JSON.stringify({
                    ...authUser,
                    savedPosts: [...savedPosts, postId]
                }));
                
            showToast("Success", "Added to Saved Posts", "success");

                setIsSaved(true);
            }


        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, isSaved, addToSavePost };
}

export default useAddToSavedPosts;
