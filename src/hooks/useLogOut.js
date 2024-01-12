import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';

function useLogOut() {
    const logoutUser = useAuthStore(state => state.logout);
    const showToast = useShowToast();
    const [signOut, isLoggingOut, error] = useSignOut(auth);

    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.removeItem("user-info");
            showToast("Success", "Logged Out Successfully", "success");
            logoutUser();
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }




  return {handleLogout,isLoggingOut,error}
}

export default useLogOut