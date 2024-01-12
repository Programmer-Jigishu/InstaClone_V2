import { useState } from 'react'
import useShowToast from './useShowToast'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { fireStore } from '../firebase/firebase'

function useSearchUser() {
    const [searchedUser, setSearchUser] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    const showtoast = useShowToast()


    const getUserProfile = async (username)=>{
        setIsSearching(true)
        setSearchUser(null)
        try {
            const q = query(collection(fireStore, "users"), where("userName", "==", username));
            const querySnapshot = await getDocs(q);

            if(querySnapshot.empty) return showtoast("Error", "No user found", "error")
            
            setSearchUser(querySnapshot.docs[0].data());
            
        } catch (error) {
            showtoast("Error", error.message, "error")
        }finally{
            setIsSearching(false)
        }
    }

  return {isSearching, searchedUser, getUserProfile,setSearchUser}
}

export default useSearchUser