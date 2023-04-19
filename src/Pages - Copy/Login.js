import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import User from "../Files/User.json";
import Question from "../Files/Question.json";

const Credential = User;
const Login = ({ setFlag, startEvent }) => {
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
  const [LogDetails, setLogDetails] = React.useState({
    name: "",
    uName: "",
    pwd: "",
  });
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
      <div className="login-container">
        <div>
          <h1
            onClick={() => {
              setFlag(0);
            }}
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
                return item["uName"] === uName && item["pwd"] == pwd;
              });

              if (user.length > 0) {
                if (uName === user[0].uName && user[0].Acc == "Admin") {
                  setFlag(4);
                  localStorage["Name"] = user[0]["Name"];
                  localStorage["eventName"] = user[0]["eventName"];
                  return false;
                }
                var qn = Question;
                if (
                  user[0].Round >=
                  Object.keys(Question[user[0].eventName]).length + 1
                ) {
                  alert("No more rounds for you!\nThank You!");
                  return false;
                }
                localStorage["uName"] = user[0]["uName"];
                localStorage["Name"] = user[0]["Name"];
                localStorage["eventName"] = user[0]["eventName"];
                localStorage["Round"] = user[0]["Round"];
                startEvent(3, localStorage.Round);

                Timer();
                // document.querySelector(".login-container").style.display =
                //   "none";
                // document.querySelector(".divStartPage h2").innerHTML =
                //   "Welcome " + localStorage["Name"];
                // document.querySelector(".divStartPage").style.display = "";
              } else if (uName !== "" && pwd !== "") {
                toastError();
              }
            }}
            {...isDisable()}>
            Log In{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};
export default Login;
