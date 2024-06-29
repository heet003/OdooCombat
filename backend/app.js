const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const usersRoutes = require("./routes/users-routes");
const recyclerRoutes = require("./routes/recycler-routes");
const HttpError = require("./models/http-error");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

//   next();
// });

app.use("/api/recyclers", recyclerRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

mongoose
  .connect(
    `mongodb+srv://heetB:yfJrlEA2Sss4QsVn@cluster0.umdmyvs.mongodb.net/odooDB?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Server listening on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
