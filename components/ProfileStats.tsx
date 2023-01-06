import { useState } from "react";
import Modal from "./Modal";


export default function ProfileStats() {
    const [show, setShow] = useState<boolean>(false);

    return(
        <div className="profile__stats">
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
            <button onClick={() => setShow(true)} className="btn profile-btn">Post</button>
            <Modal show={show} setShow={setShow} />
        </div>
    );
}