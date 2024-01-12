import React, { useState } from 'react'
import useShowToast from './useShowToast'
import useAuthStore from '../store/authStore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { fireStore } from '../firebase/firebase'
import usePostStore from '../store/postStore'

function useLikePost(post) {
    const [isUpdating, setIsUpdating] = useState(false)
    const authUser = useAuthStore((state) => state.user)
    const [likes, setLikes] = useState(post.likes.length)
    const [isLikedByUser, setIsLikedByUser] = useState(post.likes.includes(authUser?.uid))
    const showToast = useShowToast()

    const { posts, setPosts } = usePostStore();


    const handleLikes = async () => {
        if (!authUser) return showToast("Error", "Please login to like this post", "error");
        if (isUpdating) return;
        setIsUpdating(true)

        try {
            const docRef = doc(fireStore, "posts", post.id)
            await updateDoc(docRef, {
                likes: isLikedByUser ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            })
            setLikes(isLikedByUser ? likes - 1 : likes + 1)
            setIsLikedByUser(!isLikedByUser)

            // Inside PostStore
            setPosts(posts.map((item) => {
                if (item.id === post.id) {
                    return {
                        ...post,
                        likes: isLikedByUser ? post.likes.filter((like) => like !== authUser.uid) : [...post.likes, authUser.uid]
                    }
                }
                return item
            }))

        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false)
        }


    }
    return {
        handleLikes,
        isUpdating,
        likes,
        isLikedByUser
    }
}

export default useLikePost