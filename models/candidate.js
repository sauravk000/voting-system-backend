import mongoose, { model } from "mongoose";
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contractAddress: {
    type: String,
    require: true,
  },
});

const Candidate = model("Candidate", candidateSchema);

export default Candidate;
