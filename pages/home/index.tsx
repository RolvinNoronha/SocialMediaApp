import { auth } from "../../lib/Firebase"
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";


export default function Home() {
    const router = useRouter();

    
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            router.push("/");
        }
    });

    return <div>
    </div>
}