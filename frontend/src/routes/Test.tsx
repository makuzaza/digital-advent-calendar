import { useEffect, useState } from "react";
import axios from "axios";

// firebase
import { loginWithEmailAndPassword } from "../auth/firebase";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";
import { onAuthStateChanged } from "firebase/auth";

// redux
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { setToken } from "../store/tokenSlice";

// helpers
import { saveJson } from "../helpers/saveJson";

const Test: React.FC = () => {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const dispatch = useAppDispatch();

  // get state from redux store
  const token = useAppSelector((state) => state.token.token);

  const handleLogin = async (email: string, password: string) => {
    const newToken = await loginWithEmailAndPassword(email, password);
    dispatch(setToken(newToken));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setToken(""));
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      user ? setUserSignedIn(true) : setUserSignedIn(false)
    );

    return () => unsubscribe();
  }, []);

  const handleGetData = (endpoint: string) => {
    // Make an HTTP request to your backend using Axios
    axios
      .get(`http://localhost:8000${endpoint}`, {
        params: {
          token: token,
        },
      })
      // Handle successful response from backend if needed
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error sending token to backend:", error);
      });
  };

  return (
    <div>
      <button onClick={() => handleLogin("test@test.com", "test1234")}>
        Log in
      </button>
      <button onClick={() => handleGetData("/firestore/calendars")}>
        GET DATA
      </button>
      <button
        onClick={() =>
          saveJson("/firestore/calendars", { name: "new record!!!" }, token)
        }
      >
        UPLOAD JSON object
      </button>
      <button onClick={handleLogout}>Log out</button>
      {userSignedIn ? <p>User is signed in!</p> : <p>User is signed out!</p>}
    </div>
  );
};

export default Test;
