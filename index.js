import express from "express";
import mongoose from "mongoose";
import candidate from "./routes/candidate.js"
import "dotenv/config";


const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT;

const app = express();

const init = async () => {
  try{
    mongoose.set("strictQuery", false);

    await (mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }));
    app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}`);
    })
  }catch (err) {
    console.log("Couldn't connect");
  }
  
};

app.get("/", (req, res) => {
  console.log(req.body);
});

app.use("/candidate", candidate);

init();
