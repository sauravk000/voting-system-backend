import mongoose, { model } from "mongoose";
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
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

const Candidate = model("Candidate", CandidateSchema);

export default Candidate;
