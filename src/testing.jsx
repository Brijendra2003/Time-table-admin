import React, { useState } from "react";
import excelVerify from "./HelperFiles/verifyExcel";

const ExcelReader = () => {
  const [data, setData] = useState([]);
  const handleFileUpload = async (event) => {
    let columns = ["Enrollment", "Studentname", "Bran"];
    const file = event.target.files[0];
    try {
      const result = await excelVerify(file, columns);
      setData(result);
    } catch (error) {
      setData(error);
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <h3>Excel Data:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ExcelReader;
