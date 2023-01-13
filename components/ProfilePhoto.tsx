import { auth } from "../lib/Firebase";

export default function ProfilePhoto() {

    const user = auth.currentUser;

    return (
        <div className="profile__picture">
            <img className="profile__picture-img" src={user?.photoURL ? user?.photoURL : ""} alt="image" />
            <p className="text profile__picture-username mt-sm">{user?.displayName}</p>
        </div>
    );
}