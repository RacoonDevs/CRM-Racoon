import { pool } from "../db.js";
import { comparePassword } from "./auth.controller.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM user");
    res.json(rows);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM user WHERE id = ?",
      req.params.id
    );
    if (rows.length <= 0)
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    delete rows[0]["password"];
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createUser = async (req, res) => {
  const {
    userName,
    firstName,
    lastName,
    email,
    password,
    country,
    address,
    phone,
    gender,
    bornDate,
    photoURL,
    bgSelected,
  } = req.body;

  try {
    const user_email = await pool.query(
      "SELECT * FROM user WHERE email = ?",
      email
    );

    if (user_email[0].length > 0) {
      return res.status(400).json({
        error: "Email already exists.",
      });
    }
    const user_name = await pool.query(
      "SELECT * FROM user WHERE userName = ?",
      userName
    );

    if (user_name[0].length > 0) {
      return res.status(400).json({
        error: "Username already exists.",
      });
    }

    const [rows] = await pool.query(
      "INSERT INTO user (userName, firstName, lastName, email, password, country, address, phone, gender, bornDate, photoURL, bgSelected) values (?,?,?,?,?,?,?,?,?)",
      [
        userName,
        firstName,
        lastName,
        email,
        await encryptPassword(password),
        country,
        address,
        phone,
        gender,
        bornDate,
        photoURL,
        bgSelected,
      ]
    );

    res.status(201).json({
      user: {
        id: rows.insertId,
        userName,
        firstName,
        lastName,
        email,
        country,
        address,
        phone,
        gender,
        bornDate,
        photoURL,
        bgSelected,
      },
    });
  } catch (error) {
    console.log(Date.now() + ": " + "SignUp failed: ");
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE user SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Usuario no encontrado",
      });

    const [userFound] = await pool.query("SELECT * FROM user WHERE id = ?", id);

    const user = userFound[0];

    res.json({ user });
  } catch (error) {
    console.log(Date.now() + error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const [userFound] = await pool.query(
      "SELECT * FROM user WHERE id = ?",
      req.params.id
    );

    if (!userFound[0]) {
      return res.status(400).json({
        error: "User not found.",
      });
    }

    const matchPassword = await comparePassword(
      req.body.password,
      userFound[0].password
    );

    if (!matchPassword) {
      return res.status(400).json({
        error: "Password does not match.",
      });
    }

    const [result] = await pool.query(
      "DELETE FROM user WHERE id = ?",
      req.params.id
    );

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "User not found",
      });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
