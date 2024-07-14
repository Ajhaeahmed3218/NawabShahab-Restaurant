import { getAuth ,createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import axios from "axios";
// import auth from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const AuthContext = createContext(null)
const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Register
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // update user 
    const upDateUserProfile = (name, photoURL) =>{
        setLoading(true)
        return  updateProfile(auth.currentUser, {
              displayName: name ,
              photoURL: photoURL
            })
            
      }
    
      // Sign Useer
    const login = (email, password) => {
        setLoading(true)
       return signInWithEmailAndPassword(auth, email, password)
    }

    // Google login 

    const googleLogin = () => {
        setLoading(true)
      return  signInWithPopup(auth, googleProvider)
    }

    // Github 

    // const githubLogin = () => {
    //     setLoading(true)
    //    return signInWithPopup(auth, githubProvider)
    // }


    // logout 
    const logOut = () => {
        setLoading(true)
       return signOut(auth)
    }


    useEffect(() =>{
        const unSubscribe =  onAuthStateChanged(auth, (currentUser) =>{
           
                setUser(currentUser)
                setLoading(false)
             
        })
        return () => unSubscribe()
    },[auth])

    //   useEffect(() =>{
    //     const unSubscribe =  onAuthStateChanged(auth, (currentUser) =>{
    //        const userEmail = currentUser?.email || user?.email
    //        const loggedUser = {email :userEmail}

    //         setUser(currentUser)
    //         setLoading(false)
    //         // User Thakle token dibo
    //         if (currentUser) {
    //             axios.post('https://nawab-sahab-server.vercel.app/jwt', loggedUser, { withCredentials: true })
    //                 .then(res => {
    //                     console.log(res.data);
                        
    //                 })
    //         }
    //         else{
    //             axios.post('https://nawab-sahab-server.vercel.app/logout',loggedUser, {withCredentials : true} )
    //             .then(res => {
    //                 console.log(res.data);
    //             })
    //         }
             
    //     })
    //     return () => unSubscribe()
    // },[auth])

    const authInfo ={
        user,
        setUser,
        loading,
        createUser,
        upDateUserProfile,
        logOut,
        login,
        googleLogin,
        // githubLogin        
    }
    return (
        <div>
            <AuthContext.Provider  value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;