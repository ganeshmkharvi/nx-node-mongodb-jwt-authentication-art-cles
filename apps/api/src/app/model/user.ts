import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

userSchema.method("toJSON", function () {
    // eslint-disable-next-line
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const user = mongoose.model("User", userSchema);
export = user; 
