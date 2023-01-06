import ProfileStats from "../../components/ProfileStats";
import ProfilePhoto from "../../components/ProfilePhoto";
import Posts from "../../components/Posts";

export default function Profile() {
    return <div className="profile">
        <div className="profile__details">
            <ProfilePhoto />
            <ProfileStats />
        </div>
        <Posts />
    </div>
}