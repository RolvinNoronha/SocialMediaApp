import Link from "next/link";
import {  useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../lib/Firebase";

export default function Header() {
    const router = useRouter();

    function logout() {
        localStorage.removeItem("uid");
        signOut(auth).then(() => { router.push("/") })
    }

    return <div className="header">
        <Link className="header__title" href="/home">Intclone</Link>
        <div className="header__links">
            <Link className="header__links-search" href="/search">Search</Link>
            <Link className="header__links-profile" href="/my-profile">My Profile</Link>
            <button onClick={logout} className="btn btn-header" >Sign out</button>
        </div>
    </div>
}