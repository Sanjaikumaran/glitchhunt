import User from "../Files/User.json";
import React, { useState } from "react";
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
const Hunter = ({ setFlag, Round }) => {
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
  const [activeQuestion, setActiveQuestion] = React.useState(0);
  // Question[localStorage.eventName][Round]
  const [questions, setQuestions] = useState([]);
  console.log(questions);
  return (
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
                    highlight(questions[activeQuestion].question, languages.js)
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
                    highlight(questions[activeQuestion].answer, languages.js)
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
                      let rAns = questions.filter((item) => {
                        return item.question == item.answer;
                      });

                      if (activeQuestion + 1 === questions.length) {
                        let con = window.confirm("Do you want to Submit?");
                        if (con) {
                          User.forEach((item) => {
                            if (item.uName == localStorage.uName) {
                              item.Round = parseInt(item.Round) + 1;
                            }
                          });
                          axios
                            .post("http://localhost:4001/Upload", {
                              data: JSON.stringify(User),
                              fileName: "../Files/User.json",
                            })
                            .then((result) => {});
                          let rAns = questions.filter((item) => {
                            return item.question == item.answer;
                          });
                          rAns = rAns.length;
                          var answerSet = [];
                          questions.forEach((item) => {
                            answerSet.push({
                              QuestionNo: item.No,
                              QuestionTitle: item.title,
                              Answer: item.answer,
                            });
                          });
                          let result = [
                            {
                              Name: localStorage["Name"],
                              EventName: localStorage["eventName"],
                              Round: localStorage["Round"],
                              timeTaken:
                                document.querySelector("#spnTimer").innerHTML,
                              Result: rAns,
                              answerSet: answerSet,
                            },
                          ];
                          debugger;
                          let oldResult = [];
                          if (localStorage.Round != 1) {
                            oldResult = require(`../Files/${localStorage.eventName.replaceAll(
                              " ",
                              ""
                            )}/${localStorage.Name.replaceAll(" ", "")}.json`);
                          }
                          result = [...oldResult, ...result];

                          axios
                            .post("http://localhost:4001/resultUpload", {
                              data: JSON.stringify(result),
                              fileName:
                                "../Files/" +
                                localStorage.eventName.replaceAll(" ", "") +
                                "/" +
                                localStorage["Name"].replaceAll(" ", "") +
                                ".json",
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
        <>
          <div className="divStartPage">
            <div
              style={{
                backgroundColor: "#025aa5",
                textAlign: "center",
                color: "white",
              }}>
              <h1
                style={{
                  padding: "10px",
                }}>
                {localStorage.eventName}
              </h1>{" "}
            </div>{" "}
            <div style={{ margin: "3rem 0" }} className="container">
              <h2> Welcome</h2>{" "}
            </div>
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
                <li>
                  {" "}
                  If you have any doubts, you can ask your coordinators.{" "}
                </li>{" "}
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
              <div>
                <button
                  id="btnStart"
                  onClick={() => {
                    document.querySelector("#btnStart").style.display = "none";
                    document.querySelector("#spnStartCount").innerHTML =
                      "Will Start in <b>" + startCount + " Sec.</b>";
                    const sTimer = setInterval(() => {
                      startCount = startCount - 1;
                      document.querySelector("#spnStartCount").innerHTML =
                        "Will Start in <b>" + startCount + " Sec.</b>";
                      if (startCount === 0) {
                        Timer();
                        clearInterval(sTimer);
                        timer = {
                          min: 0,
                          sec: 0,
                        };
                        setQuestions(Question[localStorage.eventName][Round]);
                      }
                    }, 1000);
                  }}>
                  Start Round {Round}{" "}
                </button>{" "}
                <span id="spnStartCount"> </span>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        </>
      )}
    </>
  );
};

export default Hunter;
