const express = require('express');
const app = express();
const ExpressError = require("./expressError");
const {
  convertAndValidateNumsArray,
  findMean,
  findMedian,
  findMode,
} = require('./helpers');

app.get('/mean', (req, res, next) => {
  if (!req.query.nums) {
    throw new ExpressError("Must be list of numbers separated by a ,");
  }
  let numsString = req.query.nums.split(",");
  let nums = convertAndValidateNumsArray(numsString);

  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }
  let result = {
    operation: "mean",
    value: findMean(nums),
  };

  return res.send(result);
});

app.get("/median", (req, res, next) => {
  if (!req.query.nums) {
    throw new ExpressError("Must be list of numbers separated by a ,");
  }
  let numsString = req.query.nums.split(",");
  let nums = convertAndValidateNumsArray(numsString);

  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }

  let result = {
    operation: "median",
    value: findMedian(nums),
  };

  return res.send(result);
});
app.get("/mode", (req, res, next) => {
  if (!req.query.nums) {
    throw new ExpressError("Must be list of numbers separated by a ,");
  }
  let numsString = req.query.nums.split(",");
  let nums = convertAndValidateNumsArray(numsString);

  if (nums instanceof Error) {
    throw new ExpressError(nums.message);
  }
  let result = {
    operation: "mode",
    value: findMode(nums),
  };

  return res.send(result);
});

app.use(function (req, res, next) {
  const error = new ExpressError("Not Found", 404);

  return next(error);
});

app.use(function (error, req, res, next) {
  res.status(error.status || 500);

  return res.json({
    error: error,
    message: error.message,
  });
});

app.listen(3000, () => {
  console.log("App on port 3000");
});
