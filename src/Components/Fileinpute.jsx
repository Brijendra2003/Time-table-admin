import "../Styles/Fileinpute.css";
import excelVerify from "../HelperFiles/verifyExcel";
import { useState, useEffect } from "react";
import Notification from "./Notification";
import axiosInstance from "../HelperFiles/axiosInstance";
import Loading from "./loading";

export default function Fileinpute({
  lable,
  verified,
  uploaded,
  tblname,
  columns,
  refresh,
  url,
  filename,
}) {
  let [loading, setLoading] = useState(null);
  const [values, setValues] = useState({
    veri: verified,
    upl: uploaded,
    input: "",
  });

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      veri: verified,
      upl: uploaded,
    }));
  }, [verified, uploaded]);

  const [notify, setNotify] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    try {
      const result = await excelVerify(file, columns);
      // JSON.stringify(result, null, 2);
      // console.log("Excel Verify Result:", result);

      if (Array.isArray(result)) {
        setValues((values) => ({
          ...values,
          veri: true,
        }));
        // console.log("The data is : -", result);
        // result is an array of object
        let datas = result.map((data) => Object.values(data));
        // now we converted it into Array of Array
        // console.log("The datas is:- ", datas);
        setLoading(<Loading />);
        axiosInstance
          .post(
            "/home",
            { tablename: tblname, sendData: datas },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            setLoading(null);
            console.log(res.data.message);
            refresh();
            setNotify(
              <Notification type={"success"} message={res.data.message} />
            );
            setTimeout(() => {
              setNotify(null);
              // console.log(error);
            }, 2500);
          })
          .catch((err) => {
            setLoading(null);
            console.log("error acuured", err);
          });

        setNotify(
          <Notification
            type={"success"}
            message={"Your Ecell Sheet is Verified Successfully!"}
          />
        );
        setTimeout(() => {
          setNotify(null);
          // console.log(error);
        }, 2500);
      }
    } catch (error) {
      setNotify(<Notification type={"error"} message={error} />);

      setTimeout(() => {
        setNotify(null);
        // console.log(error);
      }, 2000);
    }
  };

  return (
    <>
      {notify}
      {loading}
      <div className="fileinpute">
        <label className="file-label"> {lable} </label>
        <div className="verified">
          Verified{" "}
          <i
            className={
              values.veri
                ? "fa-solid fa-circle-check"
                : "fa-solid fa-circle-xmark"
            }
          ></i>
        </div>
        <div className="uploaded">
          Uploaded{" "}
          <i
            className={
              values.upl
                ? "fa-solid fa-circle-check"
                : "fa-solid fa-circle-xmark"
            }
          ></i>
        </div>
        {!uploaded && (
          <input
            className="file-inp"
            type="file"
            accept=".xlsx, .xlsm,"
            name="fileinpute"
            value={values.input}
            onChange={handleFileUpload}
          />
        )}
      </div>
    </>
  );
}
