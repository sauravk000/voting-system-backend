import mongoose from '../db/connection.js';
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  isCandidate: {
    type: Boolean,
    required: true,
  },
});

const User = model('User', UserSchema);

export default User;
