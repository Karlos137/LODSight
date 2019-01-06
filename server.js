const express = require("express");
const app = express();
const port = 5000;
const { execFile } = require("child_process");
const nodemailer = require("nodemailer");
var WatchJS = require("melanke-watchjs");

var watch = WatchJS.watch;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lodsight.test@gmail.com",
    pass: "DOPLNIT_HESLO"
  }
});

app.post("/", (req, res) => {
  const textAreaText = req.body.textArea;
  const email = req.body.email;

  let mailOptions = {
    from: "LODSight",
    to: "",
    subject: "LODSight summarizace byla dokončena",
    text: ""
  };

  let watcherObj = {
    results: []
  };
  mailOptions.to = email;
  console.log(req.body);

  let final = [];
  watch(watcherObj, "results", () => {
    if (watcherObj.results.length === final.length) {
      for (let item of watcherObj.results) {
        mailOptions.text += item;
        if (
          watcherObj.results.length - 1 ===
          watcherObj.results.indexOf(item)
        ) {
          let today = new Date();
          let seconds = today.getSeconds();
          let minutes = today.getMinutes();
          let hours = today.getHours();
          let day = today.getDate();
          let month = today.getMonth() + 1;
          let year = today.getFullYear();

          if (day < 10) {
            day = "0" + day;
          }
          if (month < 10) {
            month = "0" + month;
          }
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          if (hours < 10) {
            hours = "0" + hours;
          }

          today =
            day +
            "/" +
            month +
            "/" +
            year +
            "  " +
            hours +
            ":" +
            minutes +
            ":" +
            seconds;
          mailOptions.text += `
          Sumarizace byla dokončena v ${today}`;
        }
      }

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email byl odeslán: " + info.response);
        }
      });
    }
  });
  let arr = [];
  rows = textAreaText.split("\r\n");
  console.log(rows);

  for (let item of rows) {
    item = item.trim();
    arr = item.split(" ");
    console.log(arr);
    let obj = {};
    obj.endpoint = arr[0];
    if (arr.length >= 2) {
      obj.dataset = arr[1];
    } else {
      obj.dataset = null;
    }
    final.push(obj);
  }

  for (let item of final) {
    let currentIndex = final.indexOf(item);
    console.log(currentIndex);

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
            console.log(`Nezpracovatelné URL endpointu nebo URI datasetu:
             ${error}`);
            watcherObj.results.push(`${item.endpoint} ${item.dataset} :  ERROR
            `);
            return;
          }
          console.log(stdout);
          watcherObj.results.push(`${item.endpoint} ${item.dataset} :  OK
            `);
        }
      );
    } else {
      const child = execFile(
        "java",
        ["-jar", "LODSight.jar", "config.properties", item.endpoint],
        (error, stdout, stderr) => {
          if (error) {
            console.log(`Nezpracovatelné URL endpointu:
             ${error}`);
            watcherObj.results.push(`${item.endpoint} :  ERROR
            `);
            return;
          }
          console.log(stdout);
          watcherObj.results.push(`${item.endpoint} :  OK
          `);
          if (currentIndex === final.length - 1) {
          }
        }
      );
    }
  }

  res.status(204).send();

  console.log(final);
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
