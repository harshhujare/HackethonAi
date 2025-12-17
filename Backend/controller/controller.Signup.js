import user from "../Models/Models.user.js";
import {
  CreateTokenForUser,
  validateToken,
} from "../Services/Services.Cookie.js";
import bcrypt from "bcrypt";

const cookieOptions = {
  httpOnly: true,
  secure: true,

  path: "/",
  maxAge: 24 * 60 * 60 * 1000,
};

const handelSignup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const User = await user.create({
      fullname,
      email,
      password,
    });
    //token creation
    const token = CreateTokenForUser(User);
    // Set cookie

    // ensure web path on fresh user

    return res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({ message: "usercreated successfully", success: true, User });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(400).json({
        message: "Email already exist .Plese use a different email.",
        success: false,
        error: "DUPLICATE_EMAIL",
      });
    } else {
      console.error("Signup failed:", err);
      return res
        .status(500)
        .json({ message: "Signup failed", success: false, error: err.message });
    }
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////

const handelLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const fuser = await user.findOne({ email });

    if (!fuser) {
      return res
        .status(401)
        .json({ message: "Wrong_Email_Password", success: false });
    }

    const isMatch = await bcrypt.compare(password, fuser.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Wrong_Email_Password", success: false });
    }
    let token;
    try {
      //token creation
      token = CreateTokenForUser(fuser);

      // Set cookie with proper options
      // Prepare user data to send back (excluding sensitive fields)
      const userData = {
        _id: fuser._id,
        fullname: fuser.fullname,
        email: fuser.email,
      };

      res.cookie("token", token, cookieOptions).status(200).json({
        message: "login successful",
        success: true,
        token: token, // Also send token in response for frontend storage
        user: userData, // Include user data in response
      });
    } catch (tokenError) {
      console.error("Token creation failed:", tokenError);
      return res.status(500).json({
        message: "Authentication failed",
        success: false,
        error: "Token creation failed",
      });
    }
  } catch (error) {
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation_failed",
        error: error.message,
      });
    }
  }
};
const handelLogout = (req, res) => {
  try {
    const clearOpts = { ...cookieOptions };
    delete clearOpts.maxAge;
    res.clearCookie("token", clearOpts);
    res.json({ success: true });
  } catch (error) {
    console.error("Logout failed:", error);
    res.status(500).json({ success: false, message: "Logout failed" });
  }
};
export { handelSignup, handelLogin, handelLogout };
