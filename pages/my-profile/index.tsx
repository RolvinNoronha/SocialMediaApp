import ProfileStats from "../../components/ProfileStats";
import ProfilePhoto from "../../components/ProfilePhoto";
import Posts from "../../components/Posts";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/Firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Profile() {

    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/");
            }
        });
    }, [])

    return <div className="profile">
        <div className="profile__details">
            <ProfilePhoto />
            <ProfileStats />
        </div>
        <Posts />
    </div>
}
