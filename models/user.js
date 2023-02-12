import { Schema, model } from "../db/connection.js";

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
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

const User = model("User", UserSchema);

export default User;
