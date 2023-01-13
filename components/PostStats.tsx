import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../lib/Firebase";

export default function PostStats({ postId } : { postId: string }) {

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    const [likeCount, setLikeCount] = useState(0);
    const user = auth.currentUser;

    useEffect(() => {

        async function checkLike() {
            const q = query(collection(db, "posts", postId, "likes"), where("name", "==", user?.displayName));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
               setIsLiked(true); 
            }
        }

        const unsubscribe = onSnapshot(query(collection(db, "posts", postId, "likes")), (snapshot) => {
            setLikeCount(snapshot.docs.length);
        });

        return () => {
            unsubscribe();
            checkLike();
        }
    }, [db])

    async function submitComment() {
        await addDoc(collection(db, "posts", postId, "comments"), {
            comment: input,
            userimg: user?.photoURL,
            username: user?.displayName
        })
        setInput("");
    }

    async function submitLike() {
        if (isLiked) {
            const q = query(collection(db, "posts", postId, "likes"), where("name", "==", user?.displayName));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async document => {
                const docRef = doc(db, "posts", postId, "likes", document.id);
                await deleteDoc(docRef);
            })
            setIsLiked(false);
        }
        else {
            const docRef = await addDoc(collection(db, "posts", postId, "likes"), {
                name: user?.displayName,
            })
            setIsLiked(true);
        }
    }


    return <div className="home__stats">
        <svg onClick={submitLike} style={{"fill": `${isLiked ? "#ea446a" : "#fff"}`}} className="home__stats-like" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>heart</title> <path d="M30.943 8.494c-0.816-2.957-3.098-5.239-5.994-6.040l-0.060-0.014c-0.651-0.159-1.399-0.25-2.169-0.25-2.624 0-5 1.062-6.722 2.779l0-0c-1.558-1.505-3.682-2.433-6.023-2.433-0.77 0-1.516 0.1-2.226 0.288l0.060-0.014c-3.104 0.882-5.499 3.277-6.365 6.317l-0.016 0.065c-0.171 0.648-0.269 1.393-0.269 2.16 0 2.588 1.117 4.915 2.896 6.525l0.008 0.007 11.381 12.619c0.138 0.153 0.336 0.248 0.557 0.248s0.419-0.095 0.556-0.247l0.001-0.001 11.369-12.605c2.002-1.789 3.256-4.379 3.256-7.261 0-0.759-0.087-1.498-0.252-2.208l0.013 0.066z"></path></g></svg>
        <p className="home__stats-count">{likeCount} Likes</p>
        <input 
            onChange={(e) => setInput(e.target.value)}
            className="home__stats-input"
            type="text" 
            placeholder="Add a comment.."
            value={input}
        />
        <button onClick={submitComment} className="btn comment-btn" type="button">Post</button>
    </div>
}