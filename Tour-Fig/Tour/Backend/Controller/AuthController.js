import User from "../Models/User.js";
import bcrypt from "bcryptjs";

const AuthController = {
  registerUser: async (req, res) => {
    const { name, email, password } = req.body;

    if (!name)
      return res
        .status(400)
        .json({ message: "Name is required", field: "name" });
    if (!email)
      return res
        .status(400)
        .json({ message: "Email is required", field: "email" });
    if (!password)
      return res
        .status(400)
        .json({ message: "Password is required", field: "password" });

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res
          .status(400)
          .json({ message: "Email already exists", field: "email" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    try {
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(404)
          .json({ message: "Invalid email", field: "email" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(401)
          .json({ message: "Invalid password", field: "password" });

      res.status(200).json({ message: "Login successful", user });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },
};

export default AuthController;
