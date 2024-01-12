import { useEffect, useState } from "react"
import useShowToast from "./useShowToast"
import { fireStore } from "../firebase/firebase"
// Authuser
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import useAuthStore from "../store/authStore"
import useUserProfileStore from "../store/userProfileStore"
const useFollowUser = (userId) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const authUser = useAuthStore((state) => state.user)
    const showToast = useShowToast();
    const setAuthUser = useAuthStore((state) => state.setUser)
    const { userProfile, setUserProfile } = useUserProfileStore();


    useEffect(() => {
        const isFollowing = authUser?.following?.includes(userId);
        setIsFollowing(isFollowing);

    }, [authUser, userId])

    const handleFollowUser = async () => {
        if (isUpdating) return;
        setIsUpdating(true);

        try {
            const currentUserRef = doc(fireStore, "users", authUser.uid)
            const userToFollowRef = doc(fireStore, "users", userId)

            await updateDoc(currentUserRef, {
                following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
            })
            await updateDoc(userToFollowRef, {
                followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            })

            if (isFollowing) {
                setAuthUser({
                    ...authUser,
                    following: authUser.following.filter((id) => id !== userId)
                })

                if (userProfile) {
                    (setUserProfile({
                        ...userProfile,
                        followers: userProfile.followers.filter((id) => id !== authUser.uid)
                    }))
                }
                localStorage.setItem("user-info", JSON.stringify({
                    ...authUser,
                    following: authUser.following.filter((id) => id !== userId)
                }))

                setIsFollowing(false);
            } else {
                setAuthUser({
                    ...authUser,
                    following: [...authUser.following, userId]
                })
                if (userProfile) {
                    setUserProfile({
                        ...userProfile,
                        followers: [...userProfile.followers, authUser.uid]
                    })
                }
                localStorage.setItem("user-info", JSON.stringify({
                    ...authUser,
                    following: [...authUser.following, userId]
                }))
                setIsFollowing(true);
            }

        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false);
        }
    }


    return { isUpdating, isFollowing, handleFollowUser };

}

export default useFollowUser 