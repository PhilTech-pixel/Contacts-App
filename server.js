const express = require("express");
const config = require("dotenv").config();
const connectDB = require("./config/dbConnection.js");
const mongoose = require("mongoose");
const contactRouter = require("./routes/contactRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const errorHandler = require("./middleware/errorHandler.js");

connectDB();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
