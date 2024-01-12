import { Routes,Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./layouts/HomePageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
// 1
import useAuthStore from "./store/authStore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

function App() {
  // 1
  // const authUser = useAuthStore(state => state.user);
  const authUser = useAuthState(auth) && useAuthStore(state => state.user);
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={authUser?<HomePage/>:<Navigate to="/auth"/>}/>
        <Route path="/auth" element={authUser?<Navigate to="/"/>:<AuthPage/>}/>
        <Route path="/:username" element={<ProfilePage/>} />
      </Routes>
    </PageLayout>
  );
}

export default App;
