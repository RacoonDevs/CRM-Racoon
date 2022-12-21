import { pool } from "../db.js";

export const getCompanis = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM company");
    res.json(rows);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM company WHERE id = ?",
      req.params.id
    );
    if (rows.length <= 0)
      return res.status(404).json({
        message: "Compañia no encontrado",
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createCompany = async (req, res) => {
  try {
    const [rows] = await pool.query("INSERT INTO company (name) values (?)", [
      req.body.name,
    ]);

    res.status(201).json({
      company: {
        id: rows.insertId,
        name,
      },
    });
  } catch (error) {
    console.log(Date.now() + ": " + "Create company failed: ");
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error });
  }
};

export const updateCompanyById = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE company SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);

    res.json(result);
  } catch (error) {
    console.log(Date.now() + error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCompanyById = async (req, res) => {
  try {
    const [companyFound] = await pool.query(
      "SELECT * FROM company WHERE id = ?",
      req.params.id
    );

    if (!companyFound[0]) {
      return res.status(400).json({
        error: "Company not found.",
      });
    }

    const [result] = await pool.query(
      "DELETE FROM company WHERE id = ?",
      req.params.id
    );

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "company not found",
      });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
