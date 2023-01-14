import { collection, DocumentData, onSnapshot, query, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/Firebase";

export default function Comments({ postId } : {postId: string}) {

    const [comments, setComments] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "posts", postId, "comments")), (snapshot) => {
            setComments(snapshot.docs);
        });

        return () => {
            unsubscribe();
        } 
    }, [db])

    return <div className="home__comments">
        {comments.map(comment => {
            return <div key={comment.id}>
            <div className="home__comments-imguser">
                <img className="home__comments-img" src={comment.data().userimg} alt="image" />
                <p className="home__comments-user">{comment.data().username}</p>
            </div>
            <p className="home__comments-comment">{comment.data().comment}</p>
        </div>
        })}
    </div>

}