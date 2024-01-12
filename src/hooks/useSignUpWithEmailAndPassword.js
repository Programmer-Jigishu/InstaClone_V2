import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, fireStore } from '../firebase/firebase';
import { setDoc, doc, Firestore } from 'firebase/firestore';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';
import { collection, query, where, getDocs } from "firebase/firestore";



function useSignUpWithEmailAndPassword() {
    const loginUser = useAuthStore(state => state.login);
    const logoutUser = useAuthStore(state => state.logout);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const showToast = useShowToast();

    const signup = async (inputs) => {
        if (!inputs.email || !inputs.password || !inputs.fullName || !inputs.userName) {
            showToast("Error", "Please fill all the fields", "error");
            return
        };
        // check that username does not exist in firestore
        const usersRef = collection(fireStore, "users");
        const q = query(usersRef, where("userName", "==", inputs.userName));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            showToast("Error", "Username already exists", "error");
            return
        }
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser && error) {
                showToast("Error", error.message, "error");
                console.log(error);
                return;
            }

            if (newUser) {
                console.log(newUser);
                const userDoc = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    fullName: inputs.fullName,
                    userName: inputs.userName,
                    bio: "",
                    profilePic: "",
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now()
                };

                await setDoc(doc(fireStore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }

    return { loading, error, signup };
}

export default useSignUpWithEmailAndPassword