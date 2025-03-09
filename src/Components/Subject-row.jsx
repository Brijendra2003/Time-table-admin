import { useState } from "react";
import axiosInstance from "../HelperFiles/axiosInstance";
import Notification from "./Notification";
export default function SubjectRow({ sid, sname, teid, branch }) {
  const [isedit, setEdit] = useState(false);
  const [editbtn, setEditbtn] = useState(false);
  const [editData, setEditData] = useState({
    sid,
    sname,
    teid,
    branch,
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
    console.log(editData);
    axiosInstance
      .post(
        `/subjects${sid}`,
        { ...editData },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        alert(res.data);
        // console.log(res);
        location.reload();
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
              name="sid"
              value={editData.sid}
              onChange={handleInput}
              type="text"
            />
          ) : (
            sid
          )}
        </td>
        <td>
          {isedit ? (
            <input
              className="editeInput"
              name="sname"
              value={editData.sname}
              onChange={handleInput}
              type="text"
            />
          ) : (
            sname
          )}
        </td>
        <td>{teid}</td>
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
        <td className="btn-editeDelete">
          {editbtn ? (
            <button onClick={submit} className="btn-editeRow">
              Submit
            </button>
          ) : (
            <button onClick={showEdit} className="btn-editeRow">
              Edite
            </button>
          )}
        </td>
      </tr>
    </>
  );
}
