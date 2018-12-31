const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
  const textAreaText = req.body.textArea;
  console.log(req.body);
  console.log(req.body);
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
  res.status(204).send();

  console.log(final);
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
