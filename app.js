const express = require("express");

const app = express();

app.get("/mean", (error, req, res, next) => {});
app.get("/median", (error, req, res, next) => {});
app.get("/mode", (error, req, res, next) => {});

app.listen(3000, () => {
  console.log("App on port 3000");
});
