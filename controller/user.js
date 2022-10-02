import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import user from "../models/user.js";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User Doesn't Exist!" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials." });
    }

    // const token = jwt.sign(
    //   { email: existingUser.email, id: existingUser._id },
    //   process.env.JWT_KEY,
    //   { expiresIn: "30d" }
    // );
    res
      .status(200)
      .json({ result: existingUser, token: generateToken(existingUser._id) });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, selectedFile } = req.body;
  try {
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User Already Exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      selectedFile,
    });

    // const token = jwt.sign(
    //   { email: result.email, id: result._id },
    //   process.env.JWT_KEY,
    //   { expiresIn: "30d" }
    // );

    res.status(200).json({ result, token: generateToken(result._id) });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};
