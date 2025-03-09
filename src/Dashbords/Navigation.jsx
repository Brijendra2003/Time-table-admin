import { Link } from "react-router-dom";
import "../Styles/Navigation.css";
import axiosInstance from "../HelperFiles/axiosInstance";
export default function Navigation({ home, teacher, subj, timet }) {
  let logout = () => {
    axiosInstance
      .post("/logout", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        alert(res.data.message);
        localStorage.clear();
        location.reload();
      })
      .catch((err) => {
        // console.log(err);
        alert(err.message);
        if (err.message == "Network Error") {
          alert("Server isn't responding. Please retry after some time!");
        } else if (err.message == "Request failed with status code 403") {
          alert("You were logged out! Kindly re-login.");
          localStorage.clear();
          location.reload();
        }
      });
  };

  function downloadFile(url, filename) {
    console.log(url, filename);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename; // Set default filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  return (
    <>
      <div className="top-navgation">
        <div className="menu">Universal clg</div>
        <ul className="links">
          <Link className={home ? "link-visited link" : "link"} to="/">
            Home
          </Link>
          <Link
            className={teacher ? "link-visited link" : "link"}
            to="/Teachers"
          >
            Teacher
          </Link>
          <Link className={subj ? "link-visited link" : "link"} to="/Subjects">
            Subjects
          </Link>
          <Link
            className={timet ? "link-visited link" : "link"}
            to="/Timetables"
          >
            Time-tables
          </Link>
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
          {/* <button
            onClick={() =>
              downloadFile("./assets/formates.zip", "formates.zip")
            }
            className="btn-logout"
          >
            <i className="fa-solid fa-download"></i> format
          </button> */}
        </ul>
      </div>
    </>
  );
}
