import { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import { fireStore } from '../firebase/firebase';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';

function useGetSuggestedUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const showtoast = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setIsLoading(true)
      try {

        const userRef = collection(fireStore, "users")
        const q = query(userRef, where("uid", 'not-in', [...authUser.following, authUser.uid]), orderBy("uid"), limit(5));

        const querySnapshot = await getDocs(q)

        const users = []
        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id })
        })

        setSuggestedUsers(users)
      } catch (error) {
        showtoast("Error", error.message, "error");
      }finally{
        setIsLoading(false)
      }
    }

    if (authUser.uid){getSuggestedUsers()}
  },[authUser,showtoast])


  return {isLoading,suggestedUsers}
}

export default useGetSuggestedUsers