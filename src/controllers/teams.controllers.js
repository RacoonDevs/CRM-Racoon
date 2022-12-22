import { pool } from "../db.js";

export const getTeams = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM team");
    res.json(rows);
  } catch (err) {
    console.log(Date.now() + error);
    return res
      .status(500)
      .json({ error: "Algo ha salido mal, intentelo más tarde." });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM team WHERE id = ?",
      req.params.id
    );
    if (rows.length <= 0)
      return res.status(404).json({
        error: "Team no encontrado",
      });
    res.json(rows[0]);
  } catch (error) {
    console.log(Date.now() + error);
    return res
      .status(500)
      .json({ error: "Algo ha salido mal, intentelo más tarde." });
  }
};

export const createTeam = async (req, res) => {
  const { name, code, logoURL } = req.body;
  try {
    const codeFound = await pool.query(
      "SELECT * FROM team WHERE code = ?",
      req.body.code
    );

    if (codeFound[0].length > 0) {
      return res.status(400).json({
        error: `El CODIGO ${req.body.code} ya esta en uso, intente con otro nuevamente.`,
      });
    }

    console.log(req.body);

    const [rows] = await pool.query(
      "INSERT INTO team (name, code, logoURL) values (?,?,?)",
      [name, code, logoURL]
    );

    res.status(201).json({
      team: {
        id: rows.insertId,
        name: req.body.name,
        code: req.body.code,
        logoURL: req.body.logoURL,
      },
    });
  } catch (error) {
    console.log(Date.now() + error);
    return res.status(500).json({
      message: "Algo ha salido mal, intentelo más tarde.",
      error: error,
    });
  }
};

export const updateTeamById = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE team SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({
        error: "Team no encontrado",
      });

    const [teamFound] = await pool.query(
      "SELECT * FROM team WHERE id = ?",
      req.params.id
    );

    res.json({ team: teamFound[0] });
  } catch (error) {
    console.log(Date.now() + error);
    return res
      .status(500)
      .json({ message: "Algo ha salido mal, intentelo más tarde." });
  }
};

export const deleteTeamById = async (req, res) => {
  try {
    const [teamFound] = await pool.query(
      "SELECT * FROM team WHERE id = ?",
      req.params.id
    );

    if (!teamFound[0]) {
      return res.status(400).json({
        error: "Team not found.",
      });
    }

    const [result] = await pool.query(
      "DELETE FROM team WHERE id = ?",
      req.params.id
    );

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Team not found",
      });

    res.sendStatus(204);
  } catch (error) {
    console.log(Date.now() + error);
    return res
      .status(500)
      .json({ message: "Algo ha salido mal, intentelo más tarde." });
  }
};
