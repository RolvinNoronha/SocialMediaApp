import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { use, useEffect, useState } from "react";
import { db } from "../lib/Firebase";
import Modal from "./Modal";


export default function ProfileStats() {
    const [show, setShow] = useState<boolean>(false);
    const [postCount, setPostCount] = useState<number>(0);    
    const [followCount, setFollowCount] = useState<number>(0);    

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "posts"), where("postId", "==", localStorage.getItem("uid"))), (snapshot) => {
            setPostCount(snapshot.docs.length);
        });

        async function getFollowCount() {
            //@ts-ignore
            const q = query(collection(db, "users", localStorage.getItem("uid"), "following"));
            const snapshot = await getDocs(q);
            setFollowCount(snapshot.docs.length);
        }

        return () => {
            unsubscribe();
            getFollowCount();
        }
    }, [])

    return(
        <div className="profile__stats">
            <div className="profile__stats-posts">
                <h2 className="heading-h2 mb-sm">Posts</h2>
                <p className="text profile__stats-username">{postCount}</p>
            </div>
            <div className="profile__stats-following">
                <h2 className="heading-h2 mb-sm">Following</h2>
                <p className="text">{followCount}</p>
            </div>
            <button onClick={() => setShow(true)} className="btn profile-btn">Post</button>
            <Modal show={show} setShow={setShow} />
        </div>
    );
}