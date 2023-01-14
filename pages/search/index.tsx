import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, DocumentData, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import SearchResults from "../../components/SearchResults";
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
        setInput("");
    }

    return <div className="search">
            <form onSubmit={searchUsers} className="searchbox">
                <input onChange={(e) => setInput(e.target.value)} value={input} className="searchbox-input" type="text" placeholder="Search" />
                <button className="btn search-btn" type="submit">Search</button>
            </form>
            {results.map((result) => {
                return <SearchResults key={result.id} result={result} />
            })}
        </div>

}