const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, role : userType === "admin" ? "admin" : "customer"});
    console.log("user::: ", user);

    return res.json({ token: generateToken(user) });
  } catch (error) {
    console.log("error::: ", error);
    return res.status(500).json({ message: "Dublicate enrty found!" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

     return res.json({ message : "User logged in successfully",token: generateToken(user) });
  } catch (error) {
    console.log("error::: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
