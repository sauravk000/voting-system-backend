import mongoose, { model } from "mongoose";
const Schema = mongoose.Schema;

export const CandidateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  contractAddress: {
    type: String,
    require: true,
  },
  cid: {
    type: String,
    require: true,
    unique: true
  }
});

const Candidate = model("Candidate", CandidateSchema);

export default Candidate;
