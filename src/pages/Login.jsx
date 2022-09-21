import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firbase";


const Login = () => {
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Noman Chat</span>
          <span className="title">Login</span>
          <form onSubmit={handleSubmit}>

            <input type="email" placeholder="email..." />
            <input type="password" placeholder="password..." />

            <button>Login</button>
            {err && <span>Something went wrong</span>}
          </form>
          <p>You don't have an account ? <Link to="/register">Sign Up</Link></p>
        </div>
      </div>
    </>
  );
};

export default Login;
