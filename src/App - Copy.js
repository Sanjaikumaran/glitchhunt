import React, { useEffect } from "react";
import "./App.css";

import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Hunter from "./Pages/Hunter";
import Toaster from "./Pages/Toaster";
import Admin from "./Pages/AdminPage";
export default function App() {
  const [flag, setFlag] = React.useState(1);
  const [Round, setRound] = React.useState([]);
  const startEvent = (flag_, Round_) => {
    setFlag(flag_);
    setRound(Round_);
  };
  return (
    <>
      {flag == 0 && <Home setFlag={setFlag} />}
      {flag == 1 && <Login setFlag={setFlag} startEvent={startEvent} />}
      {flag == 2 && <SignUp setFlag={setFlag} />}
      {flag == 3 && <Hunter Round={Round} setFlag={setFlag} />}
      {flag == 4 && <Admin setFlag={setFlag} />}
      {flag == 5 && <Toaster />}
    </>
  );
}
