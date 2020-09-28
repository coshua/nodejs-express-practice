var express = require("express");
var app = express();
var fs = require("fs");
var qs = require("querystring");
var path = require("path");
var template = require("./lib/template.js");
var sanitizeHtml = require("sanitize-html");
var bodyParser = require("body-parser");
var compression = require("compression");
var indexRouter = require("./routes/index");
var topicRouter = require("./routes/topic");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get("*", (req, res, next) => {
  fs.readdir("./data", function (error, filelist) {
    req.list = filelist;
    next();
  });
});

app.use("/", indexRouter);
app.use("/topic", topicRouter);

app.use((req, res, next) => {
  res.status(404).send("Sorry");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error ");
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
