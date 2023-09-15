import { auth } from "../lib/Firebase";

export default function ProfilePhoto() {

    const user = auth.currentUser;

    return (
        <div className="profile__picture">
            <img className="profile__picture-img" src={user?.photoURL ? user?.photoURL : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nicepng.com%2Fourpic%2Fu2q8i1t4t4t4q8a9_group-of-10-guys-login-user-icon-png%2F&psig=AOvVaw0ZrHHLwFMmSRoUaJAxNF38&ust=1694851913214000&source=images&cd=vfe&opi=89978449&ved=0CA4QjRxqFwoTCLCs08aVrIEDFQAAAAAdAAAAABAQ"} alt="image" />
            <p className="text profile__picture-username mt-sm">{user?.displayName && "Rolvin"}</p>
        </div>
    );
}