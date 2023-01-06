import { useRouter } from "next/router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/Firebase";

export default function Login() {

  const router = useRouter();
    const provider = new GoogleAuthProvider();

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
        <h1 className="heading-h1">Sign In with Google</h1>
        <button onClick={login} className="btn signin-btn">Sign In</button>
    </div>
  )
}
