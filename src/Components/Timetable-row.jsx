import { useState } from "react";
import axiosInstance from "../HelperFiles/axiosInstance";
export default function TimetableRow({
  branch,
  semester,
  div,
  batch,
  day,
  lecTime,
  subId,
  teachId,
  tId,
  refresh,
}) {
  const [isedit, setEdit] = useState(false);
  const [editbtn, setEditbtn] = useState(false);
  const [editData, setEditData] = useState({
    branch,
    semester,
    div,
    batch,
    day,
    lecTime,
    subId,
    teachId,
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setEditData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  let showEdit = () => {
    setEdit(true);
    setEditbtn(true);
  };

  let submit = () => {
    // console.log(editData);
    axiosInstance
      .post(`/timetable${tId}`, editData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // console.log(res);
        alert(res.data);
        location.reload();
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
  };

  let deleteRow = () => {
    axiosInstance
      .delete(`timetable${tId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // console.log(res.data);
        alert(res.data);
        refresh();
        // location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <tr>
        <td>
          {isedit ? (
            <input
              className="editeInput"
              name="branch"
              value={editData.branch}
              onChange={handleInput}
              type="text"
            />
          ) : (
            branch
          )}
        </td>
        <td>
          {isedit ? (
            <input
              className="editeInput"
              name="semester"
              value={editData.semester}
              onChange={handleInput}
              type="text"
            />
          ) : (
            semester
          )}
        </td>
        <td>
          {isedit ? (
            <input
              className="editeInput"
              name="div"
              value={editData.div}
              onChange={handleInput}
              type="text"
            />
          ) : (
            div
          )}
        </td>
        <td>
          {isedit ? (
            <input
              className="editeInput"
              name="batch"
              value={editData.batch}
              onChange={handleInput}
              type="text"
            />
          ) : (
            batch
          )}
        </td>
        <td>
          {isedit ? (
            <input
              className="editeInput"
              name="day"
              value={editData.day}
              onChange={handleInput}
              type="text"
            />
          ) : (
            day
          )}
        </td>
        <td className="lecture-time">
          {isedit ? (
            <input
              className="editeInput tt-TimeInpute"
              name="lecTime"
              value={editData.lecTime}
              onChange={handleInput}
              type="text"
            />
          ) : (
            lecTime
          )}
        </td>
        <td>{subId}</td>
        <td>{teachId}</td>
        <td>
          {editbtn ? (
            <button onClick={submit} className="btn-editeRow">
              Submit
            </button>
          ) : (
            <button onClick={showEdit} className="btn-editeRow">
              Edite
            </button>
          )}
          <button className="btn-deleteRow" onClick={deleteRow}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
