const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

app.get("/api/alojamientos", async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT
                id,
                nombre,
                municipio,
                direccion,
                descripcion,
                telefono,
                imagen
             FROM alojamientos
             ORDER BY id`,
    );

    res.status(200).json(resultado.rows);
  } catch (error) {
    console.error("Error al consultar los alojamientos:", error);

    res.status(500).json({
      mensaje: "Error al consultar los alojamientos",
    });
  }
});

app.get("/api/alojamientos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        mensaje: "El ID debe ser un número entero",
      });
    }

    const resultado = await pool.query(
      `SELECT
                id,
                nombre,
                municipio,
                direccion,
                descripcion,
                telefono,
                imagen
             FROM alojamientos
             WHERE id = $1`,
      [id],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensaje: "Alojamiento no encontrado",
      });
    }

    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    console.error("Error al consultar el alojamiento:", error);

    res.status(500).json({
      mensaje: "Error al consultar el alojamiento",
    });
  }
});

app.post("/api/alojamientos", async (req, res) => {
  try {
    const { nombre, municipio, direccion, descripcion, telefono, imagen } =
      req.body;

    if (!nombre || !municipio || !direccion || !descripcion) {
      return res.status(400).json({
        mensaje: "Nombre, municipio, dirección y descripción son obligatorios",
      });
    }

    const resultado = await pool.query(
      `INSERT INTO alojamientos (
                nombre,
                municipio,
                direccion,
                descripcion,
                telefono,
                imagen
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING
                id,
                nombre,
                municipio,
                direccion,
                descripcion,
                telefono,
                imagen`,
      [
        nombre,
        municipio,
        direccion,
        descripcion,
        telefono || null,
        imagen || null,
      ],
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error("Error al crear el alojamiento:", error);

    res.status(500).json({
      mensaje: "Error al crear el alojamiento",
    });
  }
});

app.put("/api/alojamientos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        mensaje: "El ID debe ser un número entero",
      });
    }

    const { nombre, municipio, direccion, descripcion, telefono, imagen } =
      req.body;

    if (!nombre || !municipio || !direccion || !descripcion) {
      return res.status(400).json({
        mensaje: "Nombre, municipio, dirección y descripción son obligatorios",
      });
    }

    const resultado = await pool.query(
      `UPDATE alojamientos
             SET
                nombre = $1,
                municipio = $2,
                direccion = $3,
                descripcion = $4,
                telefono = $5,
                imagen = $6
             WHERE id = $7
             RETURNING
                id,
                nombre,
                municipio,
                direccion,
                descripcion,
                telefono,
                imagen`,
      [
        nombre,
        municipio,
        direccion,
        descripcion,
        telefono || null,
        imagen || null,
        id,
      ],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensaje: "Alojamiento no encontrado",
      });
    }

    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    console.error("Error al actualizar el alojamiento:", error);

    res.status(500).json({
      mensaje: "Error al actualizar el alojamiento",
    });
  }
});

app.delete("/api/alojamientos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        mensaje: "El ID debe ser un número entero",
      });
    }

    const resultado = await pool.query(
      `DELETE FROM alojamientos
             WHERE id = $1
             RETURNING
                id,
                nombre,
                municipio,
                direccion,
                descripcion,
                telefono,
                imagen`,
      [id],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensaje: "Alojamiento no encontrado",
      });
    }

    res.status(200).json({
      mensaje: "Alojamiento eliminado correctamente",
      alojamiento: resultado.rows[0],
    });
  } catch (error) {
    console.error("Error al eliminar el alojamiento:", error);

    res.status(500).json({
      mensaje: "Error al eliminar el alojamiento",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Alojamiento Service ejecutándose en http://localhost:${PORT}`);
});
