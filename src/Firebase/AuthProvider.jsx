import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../Firebase.init";


const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

//   create user 
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
//   login
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

//   logout
  const logOut  = () =>{
       setLoading(true)
       
      return signOut(auth)
  }

//   googlSingIn
  const signInWithGoogle = () => {
       setLoading(true);
       return signInWithPopup(auth , googleProvider)
  }

//   update profile
  const updateUserProfile = ProfileInfo => {
    return updateProfile(auth.currentUser , ProfileInfo)
  }


//   onAuthChange
  useEffect(()=>{
       const unSubsCribe = onAuthStateChanged(auth , currentUser =>{
              setUser(currentUser)
              console.log('user in the auth ' , currentUser);
              setLoading(false)
       } )
       return ()=> {
              unSubsCribe()
       }
  },[])
   

  const authInfo = {
    user,
    loading,
    createUser,
    login,
    logOut,
    signInWithGoogle,
    updateUserProfile
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
