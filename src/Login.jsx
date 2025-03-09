import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "./Styles/login.css";
import { useState } from "react";

export default function Login({ takeToken }) {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <>
      <div className="topnav">
        <button className="btn-signin" onClick={() => setIsSignIn(true)}>
          Sign-in
        </button>
        <button className="btn-signup" onClick={() => setIsSignIn(false)}>
          Sign-up
        </button>
      </div>
      {isSignIn ? <SignIn takeToken={takeToken} /> : <SignUp />}
    </>
  );
}
