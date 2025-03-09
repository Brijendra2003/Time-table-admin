import * as XLSX from "xlsx";

function excelVerify(file, columns) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = (e) => {
      try {
        const binaryData = e.target.result;
        const workbook = XLSX.read(binaryData, { type: "binary" });

        // Get first sheet name
        const sheetName = workbook.SheetNames[0];

        // Convert sheet to JSON
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (sheetData.length === 0) {
          reject("Empty sheet");
          return;
        }

        // Check if all objects have the same keys
        const referenceKeys = Object.keys(sheetData[0]).sort();

        const isConsistent = sheetData.every(
          (obj) =>
            JSON.stringify(Object.keys(obj).sort()) ===
            JSON.stringify(referenceKeys)
        );
        let extractCol = Object.keys(sheetData[0]);
        // console.log(extractCol, columns);

        for (let i = 0; i < columns.length; i++) {
          if (columns[i] != extractCol[i]) {
            reject("Columns are not assigned as requierd try again!");
            break;
          }
        }

        resolve(isConsistent ? sheetData : "Objects have different keys");
      } catch (error) {
        reject("Error processing file: " + error.message);
      }
    };

    reader.onerror = () => {
      reject("File reading failed");
    };
  });
}

export default excelVerify;
