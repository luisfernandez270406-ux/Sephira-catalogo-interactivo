import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const publicUser = ({ _id, name, email, role }) => ({ _id, name, email, role });

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({ token: signToken(user), user: publicUser(user) });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Ya existe una cuenta con ese correo" });
    }
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Ingresa tu correo y contraseña" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }

    res.json({ token: signToken(user), user: publicUser(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = (req, res) => {
  res.json({ user: publicUser(req.user) });
};