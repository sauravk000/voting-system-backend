import express from "express";
import cors from "cors";
import candidate from "./routes/candidate.js";
import "dotenv/config";

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {});

app.use("/candidate", candidate);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
