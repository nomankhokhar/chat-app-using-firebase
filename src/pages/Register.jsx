import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firbase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();


  const [err, setErr] = useState(false);
  const [mes,setMsg]= useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});

              setMsg(true);

              navigate("/");
          }
           catch (err) {
            console.log(err);
            setErr(true);
          }
        });
      });

    } 
    catch (err) 
    {
      setErr(true);
    }
  };

  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          {mes && <h4 style={{color:"green"}}><b> Account Created </b></h4>}
          <span className="logo">Noman Chat</span>
          <span className="title">Register</span>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="display name" />
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <input type="file" style={{ display: "none" }} id="file" />
            <label htmlFor="file" className="htmlFor">
              <img src={Add} alt="" />
              <span>Add an Avatar</span>
            </label>
            <button>Sign up</button>
            {err && <span>Something went wrong</span>}
          </form>
          <p>You do have an account ? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </>
  );
};

export default Register;
