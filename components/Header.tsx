import Link from "next/link";
import {  useRouter } from "next/router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/Firebase";
import { useEffect, useState } from "react";

export default function Header() {
    const router = useRouter();
    const [isLogged, setIsLogged] = useState<boolean>(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogged(true);
            }
        });
    }, [])

    function logout() {
        localStorage.removeItem("uid");
        signOut(auth).then(() => { router.push("/") })
    }

    return <div className="header">
        <Link className="header__title" href="/home">Intclone</Link>
        {
            isLogged && 
            <div className="header__links">
                <Link className="header__links-search" href="/search">Search</Link>
                <Link className="header__links-profile" href="/my-profile">My Profile</Link>
                <button onClick={logout} className="btn btn-header" >Sign out</button>
            </div>
        }
    </div>
}