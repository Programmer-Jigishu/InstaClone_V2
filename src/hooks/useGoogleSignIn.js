import useShowToast from './useShowToast';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import useAuthStore from '../store/authStore';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { fireStore } from '../firebase/firebase';

function useGoogleSignIn() {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const showToast = useShowToast();

    const loginUser = useAuthStore(state => state.login);

    const handleGoogleSignIn = async (isLogin) => {
        try {
            const newUser = await signInWithGoogle();

            if (!newUser && error) {
                showToast("Error", error.message, "error");
                console.log(error);
                return;
            }

            if (newUser){
                // SignUp User
                if(!isLogin){
                const userDoc = {
                    uid: newUser.user.uid,
                    email: newUser.user.email,
                    fullName: newUser.user.email.split("@")[0],
                    userName: newUser.user.displayName,
                    bio: "",
                    profilePic: newUser.user.photoURL,
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now()
                };

                await setDoc(doc(fireStore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
            }else{
                // Login user
                const docRef = doc(fireStore, "users", newUser.user.uid);
                const docSnap = await getDoc(docRef);
                localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
                if(docSnap.data().email){
                    loginUser(docSnap.data());
                    showToast("Success", "Logged In Successfully", "success");
                }else{
                    showToast("Error", "Please sign up first", "error");
                }
            }
            }

        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }
    return {handleGoogleSignIn, loading, error}
}

export default useGoogleSignIn