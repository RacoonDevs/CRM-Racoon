import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

export const signUp = async (req, res) => {
  const { userName, firstName, lastName, email, password } = req.body;

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
      "INSERT INTO user (userName, firstName, lastName, email, password) values (?,?,?,?,?)",
      [userName, firstName, lastName, email, await encryptPassword(password)]
    );

    const token = jwt.sign({ id: rows.insertId }, SECRET, {
      expiresIn: 86400,
    });

    res.status(201).json({
      token: token,
      user: {
        id: rows.insertId,
        userName,
        firstName,
        lastName,
        email,
        country: "",
        address: "",
        phone: "",
        gender: "",
        status: "ACT",
        rol: 0,
        company_id: 1,
        bornDate: "",
        photoURL: "",
        bgSelected: "",
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

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [userFound] = await pool.query(
      "SELECT * FROM user WHERE email = ?",
      email
    );

    if (!userFound[0]) {
      return res.status(400).json({
        error: "User not found.",
      });
    }

    const matchPassword = await comparePassword(
      password,
      userFound[0].password
    );

    if (!matchPassword) {
      return res.status(400).json({
        error: "Password does not match.",
      });
    }

    const token = jwt.sign({ id: userFound[0].id }, SECRET, {
      expiresIn: 86400,
    });

    const user = userFound[0];

    res.json({ token: token, user });
  } catch (error) {
    console.log(Date.now() + ": " + "SignIn failed");
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE user SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({
        error: "Usuario no encontrado",
      });

    const [userFound] = await pool.query(
      "SELECT id, firstName, lastName, userName, email, country, address, phone, gender, bornDate, photoURL, status, rol, bgSelected, team_id FROM user WHERE id = ?",
      req.params.id
    );

    const token = jwt.sign({ id: userFound[0].id }, SECRET, {
      expiresIn: 86400,
    });

    const user = userFound[0];

    res.json({ token: token, user });
  } catch (error) {
    console.log(Date.now() + error);
    return res.status(500).json({ error: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const [userPasswordFound] = await pool.query(
      "SELECT * FROM user WHERE id = ?",
      req.params.id
    );
    const matchPassword = await comparePassword(
      req.body.currentPassword,
      userPasswordFound[0].password
    );

    if (!matchPassword) {
      return res.status(400).json({
        error: "La contraseña no coincide.",
      });
    }

    const [result] = await pool.query(
      "UPDATE user SET password = ? WHERE id = ?",
      [await encryptPassword(req.body.newPassword), req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        error: "Usuario no encontrado",
      });

    res.json({ message: "Contraseña cambiada correctamente" });
  } catch (error) {
    console.log(Date.now() + error);
    return res.status(500).json({ error: error.message });
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
