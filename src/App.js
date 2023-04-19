import React, { useEffect } from "react";
import "./App.css";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import axios from "axios";
import Home from "./Pages/Home";
import Hunter from "./Pages/Hunter";
import User from "./Files/User.json";
import Question from "./Files/Question.json";
import * as XLSX from "xlsx";

export default function App() {
   var flag = 0;
  return (
    <>
      <Hunter />
    </>
  );
}
