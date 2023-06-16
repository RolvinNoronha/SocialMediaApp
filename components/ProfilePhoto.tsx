import { auth } from "../lib/Firebase";

export default function ProfilePhoto() {

    const user = auth.currentUser;

    return (
        <div className="profile__picture">
            <img className="profile__picture-img" src={user?.photoURL ? user?.photoURL : "https://www.hdwallpaper.nu/wp-content/uploads/2015/09/tropical_beach_blue_summer_sea_emerald_sand_hd-wallpaper-1701606.jpg"} alt="image" />
            <p className="text profile__picture-username mt-sm">{user?.displayName && "Rolvin"}</p>
        </div>
    );
}