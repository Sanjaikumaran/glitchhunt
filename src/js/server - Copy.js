const express = require(`express`);
const app = express();
const cors = require("cors");
const fs = require("fs");

const Port = 4001;

app.use(cors());
app.use(express.json());

app.post("/Upload", function (req, res) {
  var data = req.body.data;
  var fileName = req.body.fileName;
  fs.writeFile(fileName, data, function (err) {
    if (err) {
      res.send("Error During Upload");
      console.log("Error During Upload ", err);
      return "Error During Upload";
    }
    res.send("Upload");
    return "Upload";
  });
});
app.post("/resultUpload", function (req, res) {
  let data = req.body.data;
  let fileName = req.body.fileName;
  let folderName = fileName.split("/");
  folderName.pop();
  folderName = folderName.join("/");
  console.log(folderName, fileName);

  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
  fs.writeFile(fileName, data, function (err) {
    if (err) {
      res.send("Error During Upload");
      console.log("Error During Upload ", err);
      return "Error During Upload";
    }
    res.send("Upload");
    return "Upload";
  });
});

app.post("/download", function (req, res) {
  var filePath = req.body.filePath;
  fs.readdir(filePath, (err, files) => {
    var arr = [];
    files.forEach((file) => {
      try {
        // console.log(filePath + "/" + file);
        const data = fs.readFileSync(filePath + "/" + file, "utf8");
        // console.log(data);
        //arr = arr + "~~~" + data;
        arr.push(data);
      } catch (err) {
        console.error(err);
      }
    });
    res.json(arr);
  });
});

fs.readFile("./Files/Question.json", "utf8", (err, jsonString) => {
  if (err) {
    return;
  }
  try {
    const data = JSON.parse(jsonString);
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});
// fs.writeFile("./Files/Question.json", JSON.stringify(updatedJSON), (err) => {
//   if (err) console.log("Error writing file:", err);
// });
const server = app.listen(Port, function () {
  console.log(`MySelf Server Running on Port : ${Port}`);
});
