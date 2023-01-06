import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Dispatch, SetStateAction, useState } from "react";
import { auth, db, storage } from "../lib/Firebase";

type Props = {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
}

export default function Modal({ show, setShow } : Props) {

    const [img, setImg] = useState<Blob>();
    const [caption, setCaption] = useState<string>("");
    const user = auth.currentUser;
    const storageRef = ref(storage);
    const imagesRef = ref(storageRef, 'images');

    console.log(user?.uid)

    const handleSubmit : React.FormEventHandler<HTMLFormElement> = async (e)  => {
        e.preventDefault();
    
        //@ts-ignore
        uploadBytes(imagesRef, img).then(async (snapshot) => { 
            getDownloadURL(snapshot.ref).then( async (downloadURL) => {
                //@ts-ignore
                const docRef = await addDoc(collection(db, "users", user?.uid, "posts"), {
                    post: downloadURL
                }) 
            });
        });
    }


    function closeModal() {
        setShow(false);
    }


    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setImg(e.target.files[0]);
    }

    return <form onSubmit={handleSubmit}>
    <div style={{ display: `${show ? "block" : "none"}`}} className="modal">
        <div className="modal__content">
            <img className="modal__img" src={img && URL.createObjectURL(img)} alt="" />
            
            <input 
                onChange={handleChange} 
                className="modal__inputimg" 
                type="file" accept="image/*" 
            />
            <input 
                onChange={(e) => setCaption(e.target.value)} 
                className="modal__caption" 
                type="text" 
                placeholder="Add a caption...." 
            />
            
            <span onClick={closeModal} className="modal__close">&times;</span>
            <button 
                disabled={!caption || !img}
                type="submit" 
                className="btn modal-btn"
            >Post</button>

        </div>
    </div>
    </form>
}