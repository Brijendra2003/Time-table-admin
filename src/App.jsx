import { Routes, Route } from "react-router-dom";
import Home from "./Dashbords/Home";
import Teacher from "./Dashbords/Teacher";
import Subjects from "./Dashbords/Subjects";
import Timetable from "./Dashbords/Timetable";
import { useState } from "react";

import Login from "./Login";

function App() {
  let [token, setToken] = useState(localStorage.getItem("token"));

  let handleLogin = (tk) => {
    setToken(tk);
  };

  return (
    <>
      {token != null ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Teachers" element={<Teacher />} />
          <Route path="Subjects" element={<Subjects />} />
          <Route path="Timetables" element={<Timetable />} />
        </Routes>
      ) : (
        <Login takeToken={handleLogin} />
      )}
    </>
  );
}

export default App;
