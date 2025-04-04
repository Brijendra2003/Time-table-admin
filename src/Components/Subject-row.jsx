import { useState } from "react";
import axiosInstance from "../HelperFiles/axiosInstance";
import Notification from "./Notification";
import Loading from "./loading";
import { useNavigate } from "react-router-dom";

export default function SubjectRow({ sid, sname, teid, branch }) {
  const navigate = useNavigate();
  const [isedit, setEdit] = useState(false);
  const [editbtn, setEditbtn] = useState(false);
  const [editData, setEditData] = useState({
    sid,
    sname,
    teid,
    branch,
  });
  let [loading, setLoading] = useState(null);

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
    setLoading(<Loading />);
    axiosInstance
      .post(
        `/subjects${sid}`,
        { ...editData },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setLoading(null);
        alert(res.data);
        // console.log(res);
        // location.reload();
        navigate("Subjects");
      })
      .catch((err) => {
        setLoading(null);
        console.log(err);
      });
  };
  return (
    <>
      {loading}
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
