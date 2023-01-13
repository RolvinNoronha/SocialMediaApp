import { auth, db } from "../../lib/Firebase"
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, DocumentData, getDocs, orderBy, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import PostStats from "../../components/PostStats";
import Comments from "../../components/Comments";
import { parentPort } from "worker_threads";


export default function Home() {
    const router = useRouter();
    const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/");
            }
            else {
                localStorage.setItem("uid", user.uid);
            }
        });

        async function getData() {
            const id = localStorage.getItem("uid");
            
            if (id) {
                const q = query(collection(db, "posts"), where("postId", "==", id), orderBy("timestamp", "desc"))
                const querySnapshot = await getDocs(q);
                setPosts(querySnapshot.docs);
            }
        }


        getData();
    }, [])

    return <div className="home">
        {posts.map(post => {
            return <div className="home-post" key={post.id}>
                
                <img className="home__img" src={post.data().post} alt="image" />
                <div className="home__interact">
                    <div className="user">
                        <img src={post.data().userimg} alt="profile" />
                        <p>{post.data().username}</p>
                    </div>
                    <PostStats postId={post.id} />
                    <p className="home__caption">{post.data().caption}</p>
                    <Comments postId={post.id} />
                </div> 
            </div>
        })}
    </div>
}