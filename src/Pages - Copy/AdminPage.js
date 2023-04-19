import * as XLSX from "xlsx";
import User from "../Files/User.json";
import Question from "../Files/Question.json";
import axios from "axios";
const Admin = () => {
  const readUploadFile = (e) => {
    e.preventDefault();
    debugger;
    let fileName = e.target.files[0].name.replace(".xlsx", "");
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames;
        console.log(sheetName);
        const Sheet1 = workbook.Sheets["Questions"];
        const Sheet2 = workbook.Sheets["UserList"];
        let Questions = XLSX.utils.sheet_to_json(Sheet1);
        let UserList = XLSX.utils.sheet_to_json(Sheet2);
        UserList.forEach((item) => {
          item["eventName"] = fileName;
          item.Round = 1;
        });
        localStorage.eventName = fileName;
        UserList = [...User, ...UserList];
        debugger;
        Questions = groupBy(Questions, "Round");
        Questions = { [fileName]: Questions };

        Questions = { ...Question, ...Questions };

        axios
          .post("http://localhost:4001/Upload", {
            data: JSON.stringify(UserList),
            fileName: "../Files/User.json",
          })
          .then((result) => {
            console.log("Uploaded");
          });
        axios
          .post("http://localhost:4001/Upload", {
            data: JSON.stringify(Questions),
            fileName: "../Files/Question.json",
          })
          .then((result) => {
            console.log("Uploaded");
          });
        console.log(Questions);
        console.log(UserList);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
      e.target.value = null;
    }
  };
  function groupBy(arr, property) {
    return arr.reduce(function (memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }
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
  var a,
    array = [];
  function form() {
    var elements = document.getElementsByClassName("form");
    for (a = 0; a < elements.length; a++) {
      array[a] = elements[a].value;
      console.log(elements[a].value);
    }
  }
  // var form = document.getElementById("myForm");
  // function handleForm(event) {
  //   event.preventDefault();
  // }
  // form.addEventListener("submit", handleForm);
  return (
    <>
      <div className="divAdmin">
        <div
          className="mainTitle"
          style={{
            fontSize: "17px",
          }}>
          <h3> Welcome {localStorage.Name}! </h3>{" "}
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
      <div className="containerAdmin">
        <h3>Contact Form</h3>
        <form
          id="myForm"
          onSubmit={() => {
            return false;
          }}
          className="form"
          // action={form()}

          name="contact_form">
          <label htmlFor="event_name">Event Name</label>
          <input
            name="event_name"
            type="text"
            required
            placeholder="Enter event name"
          />
          <br />
          <label htmlFor="qns_title">Question Title</label>
          <input
            name="qns_title"
            type="text"
            required
            placeholder="Enter question title"
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@domain.com"
          />
          <br />
          <label htmlFor="question">Question</label>
          <br />
          <textarea
            name="question"
            cols={30}
            rows={10}
            placeholder="Enter your question ..."
            defaultValue={""}
          />
          <label htmlFor="ans">Answer</label>
          <br />
          <textarea
            name="ans"
            cols={30}
            rows={10}
            placeholder="Enter your answer ..."
            defaultValue={""}
          />
          <div className="center">
            <input type="submit" onClick={form()} defaultValue="Submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Admin;
