

export default function SearchStats() {

    return <div className="profile__stats">
            <div className="profile__stats-posts">
                <h2 className="heading-h2 mb-sm">posts</h2>
                <p className="text profile__stats-username">10</p>
            </div>
            <div className="profile__stats-followers">
                <h2 className="heading-h2 mb-sm">Followers</h2>
                <p className="text">20</p>
            </div>
            <div className="profile__stats-following">
                <h2 className="heading-h2 mb-sm">Following</h2>
                <p className="text">20</p>
            </div>
            <button className="btn profile-btn">Follow</button>
        </div>
}