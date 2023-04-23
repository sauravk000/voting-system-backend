import mongoose, { model } from "mongoose";
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tCid: {
    type: String,
    required: true,
  },
  candidates: {
    type: [string],
    required: true
  }
})