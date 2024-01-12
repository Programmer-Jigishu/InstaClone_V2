import useShowToast from "./useShowToast";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, fireStore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

function useLogin() {
    const loginUser = useAuthStore(state => state.login);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const showToast = useShowToast();

    const login = async (inputs) => {
        if (!inputs.email || !inputs.password){
            showToast("Error", "Please fill all the fields", "error");
            return;
        }
        try {
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);
            if (userCred){
                const docRef = doc(fireStore, "users", userCred.user.uid);
                const docSnap = await getDoc(docRef);
                localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
                loginUser(docSnap.data());
                showToast("Success", "Logged In Successfully", "success");
            }
            else if (!userCred && error) {
                showToast("Error", error.message, "error");
                console.log(error);
                return;
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }

    return {login,loading,error};
}

export default useLogin