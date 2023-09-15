import { useRouter } from "next/router";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/Firebase";
import Image from "next/image";
import { useEffect } from "react";

export default function Login() {

    const router = useRouter();
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push("/home");
            }
        });

    }, [auth])

    async function login() {
      signInWithPopup(auth, provider)
      .then((result) => {
        
        if (result.user) {
          const user = result.user;
          setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            img: user.photoURL,
            email: user.email,
          })
        }

        router.push("/home");

      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
    } 

  return (
    <div className="sign-in">
        <Image width={500} height={150} src={"/../public/google-signin-button.png"} alt="Sign In with Google" />
        <button onClick={login} className="btn signin-btn">Sign In</button>
    </div>
  )
}
