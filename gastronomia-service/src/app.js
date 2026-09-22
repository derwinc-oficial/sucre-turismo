const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());

app.get("/api/gastronomia", async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT
                id,
                nombre,
                municipio,
                direccion,
                descripcion,
                tipo_comida AS "tipoComida",
                telefono,
                imagen
             FROM gastronomia
             ORDER BY id`,
    );

    res.status(200).json(resultado.rows);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al consultar los establecimientos gastronómicos",
    });
  }
});

app.get("/api/gastronomia/:id", async (req, res) => {
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
                tipo_comida AS "tipoComida",
                telefono,
                imagen
             FROM gastronomia
             WHERE id = $1`,
      [id],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensaje: "Establecimiento gastronómico no encontrado",
      });
    }

    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al consultar el establecimiento gastronómico",
    });
  }
});

app.post("/api/gastronomia", async (req, res) => {
  try {
    const {
      nombre,
      municipio,
      direccion,
      descripcion,
      tipoComida,
      telefono,
      imagen,
    } = req.body;

    if (!nombre || !municipio || !direccion || !descripcion || !tipoComida) {
      return res.status(400).json({
        mensaje:
          "Nombre, municipio, dirección, descripción y tipo de comida son obligatorios",
      });
    }

    const resultado = await pool.query(
      `INSERT INTO gastronomia (
                nombre,
                municipio,
                direccion,
                descripcion,
                tipo_comida,
                telefono,
                imagen
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING
                id,
                nombre,
                municipio,
                direccion,
                descripcion,
                tipo_comida AS "tipoComida",
                telefono,
                imagen`,
      [
        nombre,
        municipio,
        direccion,
        descripcion,
        tipoComida,
        telefono || null,
        imagen || null,
      ],
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el establecimiento gastronómico",
    });
  }
});

app.put("/api/gastronomia/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        mensaje: "El ID debe ser un número entero",
      });
    }

    const {
      nombre,
      municipio,
      direccion,
      descripcion,
      tipoComida,
      telefono,
      imagen,
    } = req.body;

    if (!nombre || !municipio || !direccion || !descripcion || !tipoComida) {
      return res.status(400).json({
        mensaje:
          "Nombre, municipio, dirección, descripción y tipo de comida son obligatorios",
      });
    }

    const resultado = await pool.query(
      `UPDATE gastronomia
             SET nombre = $1,
                 municipio = $2,
                 direccion = $3,
                 descripcion = $4,
                 tipo_comida = $5,
                 telefono = $6,
                 imagen = $7
             WHERE id = $8
             RETURNING
                 id,
                 nombre,
                 municipio,
                 direccion,
                 descripcion,
                 tipo_comida AS "tipoComida",
                 telefono,
                 imagen`,
      [
        nombre,
        municipio,
        direccion,
        descripcion,
        tipoComida,
        telefono || null,
        imagen || null,
        id,
      ],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensaje: "Establecimiento gastronómico no encontrado",
      });
    }

    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el establecimiento gastronómico",
    });
  }
});

app.delete("/api/gastronomia/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        mensaje: "El ID debe ser un número entero",
      });
    }

    const resultado = await pool.query(
      `DELETE FROM gastronomia
             WHERE id = $1
             RETURNING
                 id,
                 nombre,
                 municipio,
                 direccion,
                 descripcion,
                 tipo_comida AS "tipoComida",
                 telefono,
                 imagen`,
      [id],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensaje: "Establecimiento gastronómico no encontrado",
      });
    }

    res.status(200).json({
      mensaje: "Establecimiento gastronómico eliminado correctamente",
      establecimiento: resultado.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el establecimiento gastronómico",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Gastronomia Service ejecutándose en http://localhost:${PORT}`);
});
