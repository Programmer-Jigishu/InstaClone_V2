import { useState } from 'react'
import useAuthStore from '../store/authStore'
import useShowToast from './useShowToast'
import {getDownloadURL, ref,uploadString} from 'firebase/storage'
import {fireStore,storage} from '../firebase/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import useUserProfileStore from '../store/userProfileStore'

function useEditProfile() {
    const [isUpdating,setIsUpdating] = useState(false)
    const authUser = useAuthStore((state) => state.user)
    const setAuthUser = useAuthStore((state) => state.setUser)
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile)
    const showToast = useShowToast()

    const editProfile = async(inputs,selectedFile)=>{
        if(isUpdating){return};
        setIsUpdating(true);

        const storageRef = ref(storage,`profilePics/${authUser.uid}`)
        const userDocRef = doc(fireStore,"users",authUser.uid)
        let URL = "";
        try{
            if(selectedFile){
                await uploadString(storageRef,selectedFile,"data_url")
                URL = await getDownloadURL(storageRef)
                console.log(URL)
                // inputs.profilePic = selectedFile
            }
            // await updateDoc(userDocRef,inputs)
            
            const updatedUser = {
                ...authUser,
                fullName : inputs.fullName||authUser.fullName,
                userName : inputs.username||authUser.username,
                bio : inputs.bio||authUser.bio,
                profilePic : URL||authUser.profilePic
            }
            
            await updateDoc(userDocRef,updatedUser);
            localStorage.setItem("user-info",JSON.stringify(updatedUser));
            setAuthUser(updatedUser)
            setUserProfile(updatedUser)
            showToast("Success","Profile Updated","success")
            setIsUpdating(false)
            
            
        }catch(error){
            showToast("Error",error.message,"error")
            setIsUpdating(false)
        }

    }

  return {isUpdating,editProfile};
}

export default useEditProfile