import { onAuthStateChanged } from "firebase/auth";
import { collection, DocumentData, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { auth, db } from "../../lib/Firebase";


export default function Search() { 

    const router = useRouter();
    const [input, setInput] = useState<string>("");
    const [results, setResults] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push("/");
            }
        });
    }, [])

    async function searchUsers(e : any) {
        e.preventDefault();
        const q = query(collection(db, "users"), where("name", "==", input));
        const querySnapshot = await getDocs(q);
        setResults(querySnapshot.docs);
    }

    return <div className="search">
            <form onSubmit={searchUsers} className="searchbox">
                <input onChange={(e) => setInput(e.target.value)} className="searchbox-input" type="text" placeholder="Search" />
                <button className="btn search-btn" type="submit">Search</button>
            </form>
            {results.map((result, idx) => {
                return <div key={idx} className="search__results">
                    <div>
                        <img className="search__results-img" src={result.data().img} alt="profile" />
                        <Link href={`search/${result.id}`} className="search__results-name">{result.data().name}</Link>
                    </div>
                    <p>Posts: 10</p>
                    <p>Following: 10</p>
                    <button className="btn"type="button">Follow</button>
                </div>
            })}
        </div>

}