import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Notification from "./Components/Notification";
import axiosInstance from "./HelperFiles/axiosInstance";

import "./Styles/signin.css";
import { useState } from "react";

export default function SignUp() {
  const [formdata, setFormData] = useState({});
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [notify, setNotify] = useState(null);

  const setValue = (event) => {
    setFormData((formdata) => {
      formdata[event.target.name] = event.target.value;
      return { ...formdata };
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();

    if (formdata.password == formdata.cmfPassword) {
      let username = formdata.username;
      let password = formdata.password;
      try {
        const res = await axiosInstance.post("/register", {
          username,
          password,
        });
        // console.log(res);

        setNotify(<Notification type={"success"} message={res.data.message} />);
        setTimeout(() => {
          setNotify(null);
        }, 2500);
      } catch (error) {
        setNotify(
          <Notification type={"error"} message={error.response.data.error} />
        );
        setTimeout(() => {
          setNotify(null);
        }, 2500);
      }
    } else {
      console.log("Err both password are different");
    }
  };

  const setVisiblity = () => {
    setPasswordVisible(isPasswordVisible ? false : true);
  };

  return (
    <>
      {notify}
      <div className="box">
        <h2>Sign UP</h2>
        <p>Register your shelf by generating your Username and password!</p>
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
            <label>Passward</label>
            <FontAwesomeIcon
              className="icon"
              onClick={setVisiblity}
              icon={isPasswordVisible ? faEye : faEyeSlash}
            />
          </div>
          <div className="inputBox">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="cmfPassword"
              required
              onChange={setValue}
              value={formdata.cmfPassword || ""}
            />
            <label>Confirm-Passward</label>
          </div>
          <input type="submit" name="sign-in" value="Sign Up" />
        </form>
      </div>
    </>
  );
}
