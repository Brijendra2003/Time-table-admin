import { useState } from "react";
import axiosInstance from "../HelperFiles/axiosInstance";
import Notification from "./Notification";

export default function TeacherRow({ tid, tname, tdept, refresh }) {
  const [isedit, setEdit] = useState(false);
  const [notify, setNotify] = useState(null);

  const [editData, setEditData] = useState({
    tid,
    tname,
    tdept,
  });
  // console.log("the data", editData.tname);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setEditData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  let showEdit = () => {
    setEdit(true);
  };

  let submit = () => {
    axiosInstance
      .post(
        "/teachers",
        {
          teacherName: tname,
          tData: { ...editData },
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        // console.log("succcess");
        setEdit(false);
        setNotify(<Notification type={"success"} message={res.data} />);
        setTimeout(() => {
          setNotify(null);
        }, 2500);
        refresh();
      })
      .catch((err) => {
        console.log("error", err);
        setNotify(<Notification type={"error"} message={err} />);
        setTimeout(() => {
          setNotify(null);
        }, 2500);
      });
  };

  let deleteRow = () => {
    axiosInstance
      .delete("/teachers", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: { teacherId: editData.tid },
      })
      .then((res) => {
        // console.log(res.data);
        refresh();
        // alert(res.data);
        setNotify(<Notification type={"success"} message={res.data} />);
        setTimeout(() => {
          setNotify(null);
        }, 2500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {notify}
      <tr>
        <td>
          {isedit ? (
            <input
              className="editeInput"
              name="tid"
              value={editData.tid}
              onChange={handleInput}
              type="number"
            />
          ) : (
            tid
          )}
        </td>
        <td>
          {isedit ? (
            <input
              className="editeInput"
              name="tname"
              value={editData.tname}
              onChange={handleInput}
              type="text"
            />
          ) : (
            tname
          )}
        </td>
        <td>
          {isedit ? (
            <input
              className="editeInput"
              name="tdept"
              value={editData.tdept}
              onChange={handleInput}
              type="text"
            />
          ) : (
            tdept
          )}
        </td>
        <td>
          {isedit ? (
            <button onClick={submit} className="btn-editeRow">
              Submit
            </button>
          ) : (
            <button onClick={showEdit} className="btn-editeRow">
              Edite
            </button>
          )}
          <button onClick={deleteRow} className="btn-deleteRow">
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
