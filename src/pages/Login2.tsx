import React, { useState } from "react";
import "../styles/login2.css";
import image from "../images/MaleUser.png";
type Props = {};

function Login2({ Login, Register, signInWithGoogle }: any) {
  const [isSignIn, setIsSignIn] = useState<Boolean>(true);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const onLogin = () => {
    Login({ loginEmail, loginPassword });
  };
  const onRegister = () => {
    Register({ registerEmail, registerPassword });
  };
  return (
    <body>
      <div className="card">
        <img
          className="profile"
          src={image}
          alt="profile"
          style={{ width: "110px", height: "auto" }}
        />
        <p className="text"> {isSignIn ? "LOGIN" : "SIGN UP"}</p>
        <input
          type="text"
          name="Username"
          id="user"
          placeholder="Username"
          size={37}
          onChange={(event) => {
            isSignIn
              ? setLoginEmail(event.target.value)
              : setRegisterEmail(event.target.value);
          }}
        />
        <input
          type="password"
          name="Password"
          id="pass"
          placeholder="Password"
          size={37}
          onChange={(event) => {
            isSignIn
              ? setLoginPassword(event.target.value)
              : setRegisterPassword(event.target.value);
          }}
        />
        <div className="button">
          <button className="login" onClick={isSignIn ? onLogin : onRegister}>
            {isSignIn ? "LOGIN" : "REGISTER"}
          </button>
          <button className="login" onClick={() => setIsSignIn(!isSignIn)}>
            {isSignIn ? "SIGNUP" : "GO BACK TO LOGIN"}
          </button>
        </div>
        <button className="google" onClick={signInWithGoogle}>
          Login with google
        </button>
      </div>
    </body>
  );
}

export default Login2;
