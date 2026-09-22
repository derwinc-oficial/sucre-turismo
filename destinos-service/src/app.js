const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/destinos", async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT id, nombre, municipio, descripcion, imagen FROM destinos ORDER BY id",
    );

    res.status(200).json(resultado.rows);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al consultar los destinos",
    });
  }
});

app.get("/api/destinos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        mensaje: "El ID debe ser un número entero",
      });
    }

    const resultado = await pool.query(
      "SELECT id, nombre, municipio, descripcion, imagen FROM destinos WHERE id = $1",
      [id],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensaje: "Destino no encontrado",
      });
    }

    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al consultar el destino",
    });
  }
});

app.post("/api/destinos", async (req, res) => {
  try {
    const { nombre, municipio, descripcion, imagen } = req.body;

    if (!nombre || !municipio || !descripcion) {
      return res.status(400).json({
        mensaje: "Nombre, municipio y descripción son obligatorios",
      });
    }

    const resultado = await pool.query(
      `INSERT INTO destinos (nombre, municipio, descripcion, imagen)
             VALUES ($1, $2, $3, $4)
             RETURNING id, nombre, municipio, descripcion, imagen`,
      [nombre, municipio, descripcion, imagen || null],
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el destino",
    });
  }
});

app.put("/api/destinos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nombre, municipio, descripcion, imagen } = req.body;

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        mensaje: "El ID debe ser un número entero",
      });
    }

    if (!nombre || !municipio || !descripcion) {
      return res.status(400).json({
        mensaje: "Nombre, municipio y descripción son obligatorios",
      });
    }

    const resultado = await pool.query(
      `UPDATE destinos
             SET nombre = $1,
                 municipio = $2,
                 descripcion = $3,
                 imagen = $4
             WHERE id = $5
             RETURNING id, nombre, municipio, descripcion, imagen`,
      [nombre, municipio, descripcion, imagen || null, id],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensaje: "Destino no encontrado",
      });
    }

    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el destino",
    });
  }
});

app.delete("/api/destinos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        mensaje: "El ID debe ser un número entero",
      });
    }

    const resultado = await pool.query(
      `DELETE FROM destinos
             WHERE id = $1
             RETURNING id, nombre, municipio, descripcion, imagen`,
      [id],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensaje: "Destino no encontrado",
      });
    }

    res.status(200).json({
      mensaje: "Destino eliminado correctamente",
      destino: resultado.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el destino",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Destinos Service ejecutándose en http://localhost:${PORT}`);
});
