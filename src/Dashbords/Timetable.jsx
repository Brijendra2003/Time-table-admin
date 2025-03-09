import Navigation from "./Navigation";
import "../Styles/Table.css";
import TimetableRow from "../Components/Timetable-row";
import axiosInstance from "../HelperFiles/axiosInstance.js";
import { useEffect, useState } from "react";
export default function Timetable() {
  let [tableData, setTableData] = useState(null);
  let [trigger, setTrigger] = useState();

  useEffect(() => {
    axiosInstance
      .get("/timetable", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // console.log(res.data);
        setTableData(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.message == "Network Error") {
          alert("Server isn't responding. Please retry after some time!");
        } else if (err.message == "Request failed with status code 403") {
          alert("You were logged out! Kindly re-login.");
          localStorage.clear();
          location.reload();
        }
      });
  }, [trigger]);

  let Refresh = () => {
    setTrigger((prev) => !prev);
  };

  return (
    <>
      <Navigation timet={true} />
      <div className="t-container">
        <table className="timeTable">
          <thead>
            <tr>
              <th>Branch</th>
              <th>Semester</th>
              <th>Division</th>
              <th>Batch</th>
              <th>Day</th>
              <th>Lecture-Time</th>
              <th>Subject-Id</th>
              <th>Teacher-Id</th>
              <th className="edite-delete">Edite/Delete</th>
            </tr>
          </thead>
          <tbody>
            {tableData != null &&
              tableData.map((data, index) => (
                <TimetableRow
                  key={index}
                  branch={data.branch}
                  semester={data.semester}
                  div={data.division}
                  batch={data.batch}
                  day={data.day}
                  lecTime={data.lecture_time}
                  subId={data.subject_id}
                  teachId={data.teacher_id}
                  tId={data.id}
                  refresh={Refresh}
                />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
