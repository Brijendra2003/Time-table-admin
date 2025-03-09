import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "./HelperFiles/axiosInstance";
import Notification from "./Components/Notification";

import "./Styles/signin.css";
import { useState } from "react";

export default function SignIn({ takeToken }) {
  const [formdata, setFormData] = useState({});
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [notify, setNotify] = useState(null);

  const setValue = (event) => {
    setFormData((formdata) => {
      formdata[event.target.name] = event.target.value;
      return { ...formdata };
    });
  };
  const setVisiblity = () => {
    setPasswordVisible(isPasswordVisible ? false : true);
  };
  const submitForm = async (event) => {
    let username = formdata.username;
    let password = formdata.password;
    event.preventDefault();
    try {
      const res = await axiosInstance.post("/login", { username, password });
      localStorage.setItem("token", res.data.token); // Store JWT
      localStorage.setItem("username", username);
      setNotify(<Notification type={"success"} message={res.data.message} />);
      setTimeout(() => {
        setNotify(null);
        takeToken(res.data.token);
      }, 2500);
    } catch (error) {
      // alert(error.response.data.error);
      setNotify(
        <Notification type={"error"} message={error.response.data.error} />
      );
      setTimeout(() => {
        setNotify(null);
      }, 2500);
    }
  };

  return (
    <>
      {notify}
      <div className="box">
        <h2>Sign in</h2>
        <p>Enter your Username and password</p>
        <form onSubmit={submitForm}>
          <div className="inputBox">
            <input
              type="text"
              name="username"
              required
              onChange={setValue}
              value={formdata.username || ""}
            />
            <label>Username</label>
          </div>
          <div className="inputBox">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              required
              onChange={setValue}
              value={formdata.password || ""}
            />
            <label>Password</label>
            <FontAwesomeIcon
              className="icon"
              onClick={setVisiblity}
              icon={isPasswordVisible ? faEye : faEyeSlash}
            />
          </div>
          <input type="submit" name="sign-in" value="Sign In" />
        </form>
      </div>
    </>
  );
}
