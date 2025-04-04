import Navigation from "./Navigation";
import "../Styles/Table.css";
import SubjectRow from "../Components/Subject-row";
import axiosInstance from "../HelperFiles/axiosInstance.js";
import { useEffect, useState } from "react";
import Loading from "../Components/loading.jsx";
import { useNavigate } from "react-router-dom";
export default function Subjects() {
  const navigate = useNavigate();
  let [tableData, setTableData] = useState(null);
  let [isAdd, setIsAdd] = useState(false);
  let [triggered, setTriggered] = useState();
  let [formData, setFormData] = useState({
    sid: "",
    sname: "",
    teid: "",
    branch: "",
  });
  let [loading, setLoading] = useState(null);
  useEffect(() => {
    setLoading(<Loading />);
    axiosInstance
      .get("/subjects", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // console.log(res.data);
        setTableData(res.data);
        setLoading(null);
      })
      .catch((err) => {
        setLoading(null);
        console.log(err);
        if (err.message == "Network Error") {
          alert("Server isn't responding. Please retry after some time!");
        } else if (err.message == "Request failed with status code 403") {
          alert("You were logged out! Kindly re-login.");
          localStorage.clear();
          // location.reload();
          navigate("/");
        }
      });
  }, [triggered]);

  const handleAdd = (event) => {
    const { name, value } = event.target;
    setFormData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const addData = () => {
    console.log(formData);
    setFormData({});
    setLoading(<Loading />);
    axiosInstance
      .put(
        "/subjects",
        { ...formData },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setLoading(null);
        alert(res.data);
        setIsAdd(false);
        setTriggered((prev) => !prev);
        // console.log(res);
      })
      .catch((err) => {
        setLoading(null);
        console.log(err);
        alert(err.message);
        if (err.message == "Network Error") {
          alert("Server isn't responding. Please retry after some time!");
        } else if (err.message == "Request failed with status code 403") {
          alert("You were logged out! Kindly re-login.");
          localStorage.clear();
          // location.reload();
          navigate("/");
        }
      });
  };

  return (
    <>
      {loading}
      <Navigation subj={true} />
      <div className="t-container">
        <table>
          <thead>
            <tr>
              <th>Subject-id</th>
              <th>Name</th>
              <th>Teacher-id</th>
              <th>Branch</th>
              <th>Edite</th>
            </tr>
          </thead>
          <tbody>
            {tableData != null &&
              tableData.map((data, index) => (
                <SubjectRow
                  key={index}
                  sid={data.subject_id}
                  sname={data.subject_name}
                  teid={data.teacher_id}
                  branch={data.branch}
                />
              ))}
            {isAdd ? (
              <tr>
                <td>
                  <input
                    className="editeInput"
                    name="sid"
                    value={formData.sid || ""}
                    onChange={handleAdd}
                    type="number"
                    required
                  />
                </td>
                <td>
                  <input
                    className="editeInput"
                    name="sname"
                    value={formData.sname || ""}
                    onChange={handleAdd}
                    type="text"
                    required
                  />
                </td>
                <td>
                  <input
                    className="editeInput"
                    name="teid"
                    value={formData.teid || ""}
                    onChange={handleAdd}
                    type="number"
                    required
                  />
                </td>
                <td>
                  <input
                    className="editeInput"
                    name="branch"
                    value={formData.branch || ""}
                    onChange={handleAdd}
                    type="text"
                    required
                  />
                </td>
                <td>
                  <button onClick={addData} className="btn-editeRow">
                    Save
                  </button>
                  <button
                    onClick={() => setIsAdd(false)}
                    className="btn-deleteRow"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr>
                <td></td>
                <td>+ Add</td>
                <td></td>

                <td>
                  <button
                    onClick={() => setIsAdd(true)}
                    className="btn-editeRow"
                  >
                    click
                  </button>
                </td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
