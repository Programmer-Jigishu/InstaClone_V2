import { useState } from 'react'
import useShowToast from './useShowToast'
import useAuthStore from '../store/authStore'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { fireStore } from '../firebase/firebase'
import usePostStore from '../store/postStore'

function usePostComment() {
    const showToast = useShowToast()
    const [isCommenting, setIsCommenting] = useState(false)
    const authUser = useAuthStore(state => state.user)
    const addComment = usePostStore(state => state.addComment)


    // postId => On what post you are commenting 
    // comment => Your comment(as an Object)
    const handlePostComment = async (postId, comment) => {
        if (!authUser) return showToast();
        if (isCommenting) return;


        setIsCommenting(true);
        const newComment = {
            comment: comment,
            createdBy: authUser.uid,
            createdAt: Date.now(),
            postId: postId
        }



        try {
            // console.log("Use Post Comment : ",newComment)
            // const userRef = doc(fireStore, "users", authUser?.uid);
            // const userSnap = await getDoc(userRef)
            // await updateDoc(userRef, {
            //     comments: arrayUnion(newComment)
            // })

            const postRef = doc(fireStore, "posts", postId);
            await updateDoc(postRef, {
                comments: arrayUnion(newComment)
            })

            // console.log("This Ran successfully", userSnap.data())
            addComment(postId, newComment);



        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsCommenting(false);
        }

    }


    return { handlePostComment, isCommenting }

}

export default usePostComment