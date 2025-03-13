import Navigation from "./Navigation";
import "../Styles/Table.css";
import TeacherRow from "../Components/Teacher-row";
import axiosInstance from "../HelperFiles/axiosInstance.js";
import { useState, useEffect } from "react";
import Notification from "../Components/Notification.jsx";
import Loading from "../Components/loading.jsx";

export default function Teacher() {
  let [triggerd, setTriggered] = useState();
  let [tableData, setTableData] = useState(null);
  let [isAdd, setIsAdd] = useState(false);
  let [formData, setFormData] = useState({
    tid: "",
    tname: "",
    tdept: "",
  });
  let [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(<Loading />);
    setTableData(null);
    axiosInstance
      .get("/teachers", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setLoading(null);
        // console.log("fetched");
        setTableData(res.data);
        setIsAdd(false);
      })
      .catch((err) => {
        setLoading(null);
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
  }, [triggerd]);

  const handleAdd = (event) => {
    const { name, value } = event.target;
    setFormData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const addData = () => {
    // console.log(formData);
    setLoading(<Loading />);
    axiosInstance
      .put(
        "/teachers",
        { ...formData },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setLoading(null);
        alert(res.data);
        // console.log(res);
      })
      .catch((err) => {
        setLoading(null);
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

  let Refresh = () => {
    // console.log("called");
    setTriggered((prev) => !prev);
  };
  return (
    <>
      <Navigation teacher={true} />
      {loading}
      <div className="t-container">
        {tableData == null ? (
          <h1>You did not uploaded any data</h1>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Teacher-id</th>
                <th>Name</th>
                <th>Department</th>
                <th>Edite/Delete</th>
              </tr>
            </thead>
            <tbody>
              {tableData != null &&
                tableData.map((data, index) => (
                  <TeacherRow
                    key={index}
                    tid={data.teacher_id}
                    tname={data.name}
                    tdept={data.department}
                    refresh={Refresh}
                  />
                ))}
              {isAdd ? (
                <tr>
                  <td>
                    <input
                      className="editeInput"
                      name="tid"
                      value={formData.tid}
                      onChange={handleAdd}
                      type="number"
                      required
                    />
                  </td>
                  <td>
                    <input
                      className="editeInput"
                      name="tname"
                      value={formData.tname}
                      onChange={handleAdd}
                      type="text"
                      required
                    />
                  </td>
                  <td>
                    <input
                      className="editeInput"
                      name="tdept"
                      value={formData.tdept}
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
        )}
      </div>
    </>
  );
}
