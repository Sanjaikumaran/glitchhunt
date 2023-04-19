import React, { useEffect } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Hunter from "./Pages/Hunter";
import Toaster from "./Pages/Toaster";
export default function App() {
  // const [flag, setFlag] = () => {
  //   useState(0);
  // };
  var flag = 1;
  return (
    <>
      {flag == 0 && <Home />}
      {flag == 1 && <Hunter />}
      {flag == 3 && <Toaster />}
    </>
  );
}
