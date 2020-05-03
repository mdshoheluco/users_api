import fs from "fs";
import colors from "colors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import User from "./api/models/Users.js";

mongoose.connect(
  `${process.env.MONGO_URL}/users`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log("Database connected".magenta);
    } else {
      console.log("Could not connect to the database".red);
    }
  }
);

const deleteUsers = async () => {
  try {
    await User.deleteMany();
    console.log("Deleted all the users".bgBlue);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const importUsers = async () => {
  try {
    const users = JSON.parse(fs.readFileSync(`./data/Users.json`, "utf-8"));
    await User.create(users);
    console.log("Imported all the users".bgGreen);
  } catch (err) {
    console.log("Could not import data".red + err);
  }
  process.exit();
};

if (process.argv[2] === "-i") {
  importUsers();
} else if (process.argv[2] === "-d") {
  deleteUsers();
}
