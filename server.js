const express = require("express");
const app = express();
const port = 5000;
const { execFile } = require("child_process");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
  const textAreaText = req.body.textArea;
  const email = req.body.email;
  console.log(req.body);
  console.log(req.body);
  console.log(textAreaText);
  console.log(email);

  let final = [];
  let arr = [];
  rows = textAreaText.split("\r\n");
  console.log(rows);

  for (let item of rows) {
    item = item.trim();
    arr = item.split(" ");
    console.log(arr);
    obj = {};
    obj.endpoint = arr[0];
    if (arr.length >= 2) {
      obj.dataset = arr[1];
    } else {
      obj.dataset = null;
    }
    final.push(obj);
  }

  for (let item of final) {
    if (item.dataset != null) {
      const child = execFile(
        "java",
        [
          "-jar",
          "LODSight.jar",
          "config.properties",
          item.endpoint,
          "0",
          item.dataset
        ],
        (error, stdout, stderr) => {
          if (error) {
            throw error;
          }
          console.log(stdout);
        }
      );
    } else {
      const child = execFile(
        "java",
        ["-jar", "LODSight.jar", "config.properties", item.endpoint],
        (error, stdout, stderr) => {
          if (error) {
            throw error;
          }
          console.log(stdout);
        }
      );
    }
  }

  res.status(204).send();

  console.log(final);
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
