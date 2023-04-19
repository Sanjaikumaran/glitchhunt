const Event=()=>{
    return(
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
              )}
            </>
          ))
    }
