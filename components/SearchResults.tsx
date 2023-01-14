import { addDoc, aggregateQuerySnapshotEqual, collection, deleteDoc, doc, DocumentData, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../lib/Firebase";



type Props = {
    key: string,
    result: QueryDocumentSnapshot<DocumentData>,
}


export default function SearchResults({ result } : Props) {


    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [postCount, setPostCount] = useState<number>(0);
    const [followCount, setFollowCount] = useState<number>(0);

    useEffect(() => {

        async function getPostData() {
            const q = query(collection(db, "posts"), where("username", "==", result.data().name));
            const snapshot = await getDocs(q);
            setPostCount(snapshot.docs.length);
        }

        async function getFollowData() {
            const q = query(collection(db, "users", result.id, "following"));
            const snapshot = await getDocs(q);
            setFollowCount(snapshot.docs.length);
        }

        async function getFollowingData() {
            //@ts-ignore
            const q = query(collection(db, "users", localStorage.getItem("uid"), "following"), where("name", "==", result.data().name));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                setIsFollowing(true);
            }

        }

        getFollowingData();
        getPostData();
        getFollowData();
    })

    async function handleFollow(userId : string, username : string){
        const id = localStorage.getItem("uid");
        if (isFollowing) {
            if (id) {
                const docRef = doc(db, "users", id, "following", userId);
                await deleteDoc(docRef);
                setIsFollowing(false);
            }
        }
        else {
            if (id) {
                const docRef = await addDoc(collection(db, "users", id, "following"), {
                    name: username,
                    userid: result.id,
                }) 
                setIsFollowing(true);
            }
        }
    }

    return <div className="search__results">
            <div className="search__results-userImg">
                <img className="search__results-img" src={result.data().img} alt="profile" />
                <Link href={`search/${result.id}`} className="search__results-name">{result.data().name}</Link>
            </div>
            <p>Posts: {postCount}</p>
            <p>Following: {followCount}</p>
            <button onClick={() => handleFollow(result.id, result.data().name)} className="btn"type="button">{isFollowing ? "Unfollow" : "Follow"}</button>
        </div>
}