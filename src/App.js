import React, { useEffect } from "react";
import "./App.css";

import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Hunter from "./Pages/Hunter";
import Toaster from "./Pages/Toaster";
import Admin from "./Pages/AdminPage";
export default function App() {
  const [flag, setFlag] = React.useState(0);

  return (
    <>
      {flag == 0 && <Home setFlag={setFlag} />}
      {flag == 1 && <Login setFlag={setFlag} />}
      {flag == 2 && <Hunter setFlag={setFlag} />}
      {flag == 3 && <Toaster />}
      {flag == 4 && <Admin setFlag={setFlag} />}
    </>
  );
}
