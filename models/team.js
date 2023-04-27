import mongoose from '../db/connection.js';
const { Schema, model } = mongoose;

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
    type: [String],
    required: false
  }
})

const Team = model('Team', teamSchema);

export default Team;