import User from "../Files/User.json";
import React, { useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import axios from "axios";
import Question from "../Files/Question.json";
import * as XLSX from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Hunter = (setFlag) => {
  var timer = {
      min: 0,
      sec: 0,
    },
    startCount = 5;
  const Timer = () => {
    setInterval(() => {
      timer["sec"] = timer["sec"] + 1;
      if (timer["sec"] === 60) {
        timer["min"] = timer["min"] + 1;
        timer["sec"] = 0;
      }
      let min = timer["min"];
      min = min > 9 ? min : "0" + min;
      let sec = timer["sec"];
      sec = sec > 9 ? sec : "0" + sec;
      if (document.querySelector("#spnTimer") !== null)
        document.querySelector("#spnTimer").innerHTML = min + ":" + sec;
    }, 1000);
  };
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames;
        console.log(sheetName);
        const Sheet1 = workbook.Sheets["Questions"];
        const Sheet2 = workbook.Sheets["UserList"];
        const Questions = XLSX.utils.sheet_to_json(Sheet1);
        const UserList = XLSX.utils.sheet_to_json(Sheet2);
        console.log(Questions);
        console.log(UserList);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const quiz = Question[0];
  const Credential = User;

  const [questions, setQuestions] = React.useState([]);
  const [activeQuestion, setActiveQuestion] = React.useState(0);
  const [round, setRound] = React.useState(0);
  const [LogDetails, setLogDetails] = React.useState({
    name: "",
    uName: "",
    pwd: "",
  });

  useEffect(() => {
    setQuestions(quiz["Round_" + round]);
  }, [round]);
  const isDisable = () => {
    let isValidate = false;
    if (
      //  LogDetails["name"] === "" ||
      LogDetails["uName"] === "" ||
      LogDetails["pwd"] === ""
    )
      isValidate = true;

    return {
      disabled: isValidate,
    };
  };
  const fileUpload = (flag) => {
    var file,
      path = "../Files/";
    if (flag === "user") {
      path = path + "User.json";
      file = document.querySelector("#uploadUser").files;
    } else if (flag === "qus") {
      path = path + "Question.json";
      file = document.querySelector("#uploadQuestion").files;
    }
    file = file[0];
    // const [file] = document.querySelector('input[type=file]').files;
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        axios
          .post("http://localhost:4001/Upload", {
            data: reader.result,
            fileName: path,
          })
          .then((result) => {
            console.log("Uploaded");
          });
      },
      false
    );
    if (file) {
      reader.readAsText(file);
    }
  };
  const download = (flag) => {
    axios
      .post("http://localhost:4001/download", {
        filePath: "../Files/Round_" + flag,
      })
      .then((result) => {
        downloadExcel(result["data"]);
      });
  };
  const downloadExcel = (data) => {
    const workbook = XLSX.utils.book_new();
    for (let i = 0; i < data.length; i++) {
      let arr = JSON.parse(data[i]),
        user = JSON.parse(arr["userDetails"]),
        result = JSON.parse(arr["Result"]);

      var worksheet = XLSX.utils.json_to_sheet(result);
      XLSX.utils.book_append_sheet(workbook, worksheet, user["Name"]);
    }

    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "Debugging.xlsx");
  };
  const toastDark = () => toast.dark("This is Toast Notification for Dark");
  const toastInfo = () => toast.info("This is Toast Notification for Info");
  const toastSuccess = () =>
    toast.success("This is Toast Notification for Success");
  const toastWarn = () => toast.warn("This is Toast Notification for Warn");
  const toastError = () => toast.error("This is Toast Notification for Error");
  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />;
  return (
    <>
      {round !== 0 ? (
        <>
          {questions.length > 0 ? (
            <>
              <div className="mainTitle">
                <h1> Glitch Hunt </h1>{" "}
              </div>{" "}
              <div
                style={{
                  height: "57px",
                  display: "unset !important",
                }}>
                {" "}
              </div>{" "}
              <div
                className="wel"
                style={{
                  display: "inline-block",
                  margin: "0 0 0 10px",
                }}>
                <h2
                  style={{
                    margin: "0 !important",
                    padding: "10px",
                  }}>
                  Welcome {localStorage.Name}!
                </h2>{" "}
              </div>{" "}
              <div
                style={{
                  margin: "0 10px",
                  float: "right",
                  display: "inline-block",
                }}>
                {" "}
                {/* <span className="active-question-no">
                                              {addLeadingZero(activeQuestion + 1)}
                                            </span>
                                            <span className="total-question">
                                              /{addLeadingZero(questions.length)}
                                            </span> */}{" "}
              </div>{" "}
              <div className="divWrapper">
                <div
                  className="divpanel"
                  style={{
                    width: "90%",
                  }}>
                  <h3>
                    <span
                      style={{
                        fontSize: "22px",
                      }}>
                      {" "}
                      {questions[activeQuestion].No}.{" "}
                    </span>{" "}
                    {questions[activeQuestion].title} ?
                  </h3>{" "}
                  <div
                    style={{
                      height: "80vh",
                      overflow: "auto",
                      backgroundColor: "#f3f3f360",

                      border: "2px solid ",
                    }}>
                    <Editor
                      className="editor"
                      disabled={true}
                      value={questions[activeQuestion].question}
                      highlight={(code) =>
                        highlight(
                          questions[activeQuestion].question,
                          languages.js
                        )
                      }
                      padding={10}
                      style={{
                        cursor: "text",
                        backgroundColor: "#f3f3f360",
                      }}
                    />{" "}
                  </div>{" "}
                </div>{" "}
                <div
                  className="divpanel"
                  style={{
                    width: "90%",
                    padding: "0 0px 0 10px",
                  }}>
                  <div
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                    }}>
                    <h3> Try here </h3>{" "}
                    <h3>
                      <span>
                        Timer : <span id="spnTimer"> 00.00 </span>{" "}
                      </span>{" "}
                    </h3>{" "}
                  </div>{" "}
                  <div
                    style={{
                      height: "80vh",
                      overflow: "auto",

                      border: "2px solid ",
                    }}>
                    <Editor
                      className="editor"
                      disabled={false}
                      value={questions[activeQuestion].answer}
                      onValueChange={(code) => {
                        let updatedList = questions.map((item, index) => {
                          if (index === activeQuestion) {
                            return {
                              ...item,
                              answer: code,
                            };
                          }
                          return item;
                        });
                        setQuestions(updatedList);
                      }}
                      highlight={(code) =>
                        highlight(
                          questions[activeQuestion].answer,
                          languages.js
                        )
                      }
                      padding={10}
                      style={{
                        width: "100%",
                      }}
                    />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    {activeQuestion !== 0 ? (
                      <div
                        style={{
                          display: "inline-block",
                          float: "left",
                        }}>
                        <button
                          className="butn"
                          style={{
                            rotate: "180deg",
                          }}
                          onClick={() => setActiveQuestion(activeQuestion - 1)}>
                          <span> ➜ </span>{" "}
                        </button>{" "}
                      </div>
                    ) : (
                      <></>
                    )}{" "}
                    <div
                      style={{
                        display: "inline-block",
                        float: "right",
                      }}>
                      <button
                        className="butn"
                        onClick={() => {
                          if (activeQuestion + 1 === questions.length) {
                            let con = window.confirm("Do you want to Submit?");
                            if (con) {
                              // let user = Credential.filter((item) => {
                              //   return (
                              //     localStorage["uName"] === item["uName"] &&
                              //     localStorage["pwd"] === item["pwd"]
                              //   );
                              // });
                              let user = {
                                Name: localStorage["Name"],
                                Event: localStorage["eventName"],
                                Round: localStorage["Round"],
                              };
                              questions[0]["timeTaken"] =
                                document.querySelector("#spnTimer").innerHTML;
                              let arr = {
                                userDetails: JSON.stringify(user),
                                Result: JSON.stringify(questions),
                              };
                              console.log(questions);
                              console.log(Object.keys(quiz)[0]);
                              axios
                                .post("http://localhost:4001/Upload", {
                                  data: JSON.stringify(arr),
                                  fileName:
                                    "../Files/" +
                                    Object.keys(quiz)[0] +
                                    "/" +
                                    localStorage["Name"].replaceAll(" ", "") +
                                    ".txt",
                                })

                                .then((result) => {
                                  // alert("Thank You...!");
                                  window.confirm("Thank You...!");
                                  window.location.reload();
                                });
                            }
                          } else {
                            setActiveQuestion(activeQuestion + 1);
                          }
                        }}>
                        {" "}
                        {activeQuestion === questions.length - 1
                          ? "Finish"
                          : "➜"}{" "}
                      </button>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </>
          ) : (
            <></>
          )}{" "}
        </>
      ) : (
        <>
          <div
            className="divAdmin"
            style={{
              display: "none",
            }}>
            <div
              className="mainTitle"
              style={{
                fontSize: "17px",
              }}>
              <h3> Welcome SK! </h3>{" "}
            </div>{" "}
            <div
              style={{
                height: "60px",
                display: "unset !important",
              }}>
              {" "}
            </div>{" "}
            <div className="divAdminSec">
              <div
                style={{
                  textAlign: "center",
                }}>
                <input
                  type="file"
                  id="upload"
                  onChange={readUploadFile}
                  accept=".xlsx"
                />{" "}
                <label
                  type="button"
                  htmlFor="upload"
                  onChange={readUploadFile}
                  className="btn"
                  style={{
                    margin: "0px 10px",
                  }}>
                  Upload{" "}
                </label>{" "}
              </div>{" "}
              <div
                style={{
                  textAlign: "center",
                }}>
                <input
                  type="file"
                  id="uploadQuestion"
                  onChange={() => {
                    fileUpload("qus");
                  }}
                  accept=".json"
                />{" "}
                <label
                  type="button"
                  htmlFor="uploadQuestion"
                  onChange={() => {
                    fileUpload("qus");
                  }}
                  className="btn"
                  style={{
                    margin: "0px 10px",
                  }}>
                  Upload Question{" "}
                </label>{" "}
              </div>{" "}
              <div
                style={{
                  textAlign: "center",
                }}>
                <input
                  type="file"
                  id="uploadUser"
                  onChange={() => {
                    fileUpload("user");
                  }}
                  accept=".json"
                />{" "}
                <label
                  type="button"
                  htmlFor="uploadUser"
                  onChange={() => {
                    fileUpload("user");
                  }}
                  className="btn"
                  style={{
                    margin: "0px 10px",
                  }}>
                  Upload Users{" "}
                </label>{" "}
              </div>{" "}
            </div>{" "}
            <div
              className="divAdminSec"
              style={{
                display: "flex",
                justifyContent: "center",
              }}>
              <button
                onClick={() => {
                  download(1);
                }}>
                Download - 1{" "}
              </button>{" "}
              <button
                onClick={() => {
                  download(2);
                }}>
                Download - 2{" "}
              </button>{" "}
              <button
                onClick={() => {
                  download(3);
                }}>
                Download - 3{" "}
              </button>{" "}
              <button
                onClick={() => {
                  download(4);
                }}>
                Download - 4{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
          <div className="login-container">
            <div>
              <h1
                style={{
                  color: "#025aa5",
                  fontSize: "30px",
                  marginBottom: "10px",
                  textAlign: "center",
                }}>
                Sign In{" "}
              </h1>{" "}
            </div>{" "}
            <div className="input input-open">
              <div className="input-holder">
                <input
                  type="text"
                  className="input-input"
                  id="uName"
                  name="email"
                  onChange={(e) => {
                    setLogDetails({
                      ...LogDetails,
                      uName: e.target.value,
                    });
                  }}
                />
                <label className="Input-label"> user name </label>{" "}
              </div>{" "}
            </div>{" "}
            <div className="input input-open">
              <div className="input-holder">
                <input
                  type="password"
                  //type="text"
                  className="input-input"
                  id="password"
                  name="password"
                  onChange={(e) => {
                    setLogDetails({
                      ...LogDetails,
                      pwd: e.target.value,
                    });
                  }}
                />{" "}
                <label className="Input-label"> password </label>{" "}
              </div>{" "}
            </div>{" "}
            <div
              style={{
                width: "80%",
                display: "revert",
                marginBottom: " 10px",
              }}>
              <button
                className="btn marginLeft-0 marginRight-0"
                style={{
                  width: "110px",
                  marginTop: " 10px",
                  marginBottom: "20px",
                  float: "right",
                }}
                onClick={() => {
                  let uName = document.getElementById("uName").value,
                    pwd = document.getElementById("password").value;

                  let user = Credential.filter((item) => {
                    return item["uName"] === uName && item["pwd"] === pwd;
                  });
                  if (user.length > 0) {
                    if (uName === user[0].uName && user[0].Acc == "Admin") {
                      toastSuccess();
                      document.querySelector(".login-container").style.display =
                        "none";
                      document.querySelector(".divAdmin").style.display = "";
                      return false;
                    }

                    localStorage["Name"] = user[0]["Name"];
                    localStorage["eventName"] = user[0]["eventName"];
                    localStorage["Round"] = user[0]["Round"];

                    Timer();
                    document.querySelector(".login-container").style.display =
                      "none";
                    document.querySelector(".divStartPage h1").innerHTML =
                      "Welcome " + localStorage["Name"];
                    document.querySelector(".divStartPage").style.display = "";
                  } else if (uName !== "" && pwd !== "") {
                    toastError();
                  }
                }}
                {...isDisable()}>
                Log In{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
          <div
            className="divStartPage"
            style={{
              display: "none",
            }}>
            <div
              style={{
                backgroundColor: "#0589a0",
                textAlign: "center",
                color: "white",
              }}>
              <h1
                style={{
                  padding: "10px",
                }}>
                Welcome{" "}
              </h1>{" "}
            </div>{" "}
            <div
              style={{
                display: "block",
                textAlign: "left",
                marginLeft: "15px",
                fontSize: "22px",
              }}>
              <h2> INSTRUCTIONS: </h2>{" "}
              <ul>
                <li> A team can have atmost two participants. </li> <br></br>{" "}
                <li> Event consits of Two levels. </li> <br></br>{" "}
                <li> Team will be disqualified if any malpractices found. </li>{" "}
                <br></br> <li> Timer will be maintained in the background. </li>{" "}
                <br></br>{" "}
                <li> Inform coordinaters after submit your answer. </li>{" "}
                <br></br>{" "}
                <li>
                  Result will be based on number of errors cleared in short
                  time.{" "}
                </li>{" "}
                <br></br>{" "}
                <li>
                  Give space before and after operators(like + , -, *, /...) and
                  Comma(, ).{" "}
                </li>{" "}
                <br></br>{" "}
                <li> If you have any doubts, you can ask coordinators. </li>{" "}
                <br></br>{" "}
              </ul>{" "}
            </div>{" "}
            <div
              style={{
                display: "block",
                textAlign: "right",
                marginRight: "60px",
              }}>
              {" "}
              {Object.keys(quiz).map(function (key, index) {
                return (
                  <div key={index}>
                    <button
                      id="btnStart"
                      onClick={() => {
                        document.querySelector("#btnStart").style.display =
                          "none";
                        document.querySelector("#spnStartCount").innerHTML =
                          "Will Start in <b>" + startCount + " Sec.</b>";
                        const sTimer = setInterval(() => {
                          startCount = startCount - 1;
                          document.querySelector("#spnStartCount").innerHTML =
                            "Will Start in <b>" + startCount + " Sec.</b>";
                          if (startCount === 0) {
                            clearInterval(sTimer);
                            timer = {
                              min: 0,
                              sec: 0,
                            };
                            setQuestions(quiz["Round_" + (index + 1)]);
                            setRound(index + 1);
                          }
                        }, 1000);
                      }}>
                      Start {key.replace("_", " - ")}{" "}
                    </button>{" "}
                    <span id="spnStartCount"> </span>{" "}
                  </div>
                );
              })}{" "}
            </div>{" "}
          </div>
        </>
      )}{" "}
    </>
  );
};

export default Hunter;
