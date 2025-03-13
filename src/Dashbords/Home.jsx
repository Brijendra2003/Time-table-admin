import Navigation from "./Navigation";
import Fileinpute from "../Components/Fileinpute";
import Notification from "../Components/Notification";
import { useEffect, useState } from "react";
import axiosInstance from "../HelperFiles/axiosInstance.js";
import Loading from "../Components/loading.jsx";

import "../Styles/Home.css";
export default function Home() {
  let username = localStorage.getItem("username");
  let [Subject, setSubject] = useState(false);
  let [Teacher, setTeacher] = useState(false);
  let [Timetable, setTimetable] = useState(false);
  let [loading, setLoading] = useState(null);

  // console.log("current ", Timetable);

  let [triggerd, setTriggered] = useState(false);

  let handletrigger = () => {};

  useEffect(() => {
    setLoading(<Loading />);
    axiosInstance
      .get("/home", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // console.log("Api called");
        setSubject(res.data.subject > 0);
        setTeacher(res.data.teacher > 0);
        setTimetable(res.data.timetable > 0);
        setLoading(null);
      })
      .catch((res) => {
        setLoading(null);
        console.log(res);
        if (res.message == "Network Error") {
          alert("Server isn't responding. Please retry after some time!");
        } else if (res.message == "Request failed with status code 403") {
          alert("You were logged out! Kindly re-login.");
          localStorage.clear();
          location.reload();
        }
        // console.log("Api called err");

        // alert("Unauthorized, please log in");
      });
  }, [triggerd]);

  return (
    <>
      {loading}
      <Navigation home={true} />
      {username != null && (
        <h3 className="home-hellow">
          Hello {username}, welcome to our Institute
        </h3>
      )}
      <h3 className="home-heading">Kindly upload all required files.</h3>
      <div className="home-container">
        <Fileinpute
          lable={"Teacher"}
          verified={Teacher}
          uploaded={Teacher}
          tblname={"teachers"}
          columns={["teacher_id", "name", "department"]}
          refresh={() => setTriggered((prev) => !prev)}
        />
        <Fileinpute
          lable={"Subjects"}
          verified={Subject}
          uploaded={Subject}
          tblname={"subjects"}
          columns={["subject_id", "subject_name", "teacher_id", "branch"]}
          refresh={() => setTriggered((prev) => !prev)}
        />
        <Fileinpute
          lable={"Time-tables"}
          verified={Timetable}
          uploaded={Timetable}
          tblname={"timetable"}
          columns={[
            "branch",
            "semester",
            "division",
            "batch",
            "day",
            "lecture_time",
            "subject_id",
            "teacher_id",
          ]}
          refresh={() => setTriggered((prev) => !prev)}
        />
        {Timetable && (
          <Fileinpute
            lable={"+Add Time-tables"}
            verified={false}
            uploaded={false}
            tblname={"timetable"}
            columns={[
              "branch",
              "semester",
              "division",
              "batch",
              "day",
              "lecture_time",
              "subject_id",
              "teacher_id",
            ]}
            refresh={() => setTriggered((prev) => !prev)}
          />
        )}
      </div>
    </>
  );
}
