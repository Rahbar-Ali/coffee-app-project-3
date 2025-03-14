import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const { children } = props;
  const [globalUser, setGlobalUser] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function logout() {
    setGlobalUser(null);
    setGlobalData(null);
    return signOut(auth);
  }

  const value = {
    globalUser,
    globalData,
    setGlobalData,
    isLoading,
    signup,
    login,
    logout,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setGlobalUser(user);
      if (!user) {
        return;
      }

      try {
        setIsLoading(true);

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        let firebasedata = {};

        if (docSnap.exists()) {
          firebasedata = docSnap.data();
        }
        setGlobalData(firebasedata);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
