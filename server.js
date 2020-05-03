import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

// Database
import dbConnect from "./api/db/dbConnect.js";

//Routes
import userRoute from "./api/routes/Users.js";
import errorHandler from "./api/middlewares/error.js";

const server = express();
dbConnect();

server.use(express.json());

server.use("/users", userRoute);
server.use(errorHandler);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
