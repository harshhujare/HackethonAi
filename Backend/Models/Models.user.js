import bcrypt from "bcrypt";
import {Schema,model} from "mongoose";
const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const saltRounds = 10;
    const password = user.password;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashed = await bcrypt.hash(user.password, salt);
    user.password = hashed;
    next();
  } catch (err) {
    next(err);
  }
});

const user = model("user", userSchema);

export default user;
