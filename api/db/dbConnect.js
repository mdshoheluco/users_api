import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/users`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.log("Could not connect to the database");
  }
};

export default dbConnect;
