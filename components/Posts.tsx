import { collection, DocumentData, onSnapshot, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/Firebase";


export default function Posts() {

    const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

    useEffect(() => {

        
        const id = localStorage.getItem("uid");
        if (id) {
            const unsubscribe = onSnapshot(query(collection(db, "posts"), where("postId", "==", id)), (snapshot) => {
            setPosts(snapshot.docs);
            });

            return () => {
                unsubscribe();
            }
        }

    }, [db])

    return (
        <div className="profile__posts">
            {posts.map((doc) => {
            return <img className="profile__post" src={doc.data().post} key={doc.id} />
        })}
        </div>
    );
}
