const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).json({
    mensaje: "API Gateway de Sucre Turístico funcionando",
  });
});

app.use(
  "/api/destinos",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
    pathRewrite: {
      "^/": "/api/destinos/",
    },
  }),
);

app.use(
  "/api/alojamientos",
  createProxyMiddleware({
    target: "http://localhost:3002",
    changeOrigin: true,
    pathRewrite: {
      "^/": "/api/alojamientos/",
    },
  }),
);

app.use(
  "/api/gastronomia",
  createProxyMiddleware({
    target: "http://localhost:3003",
    changeOrigin: true,
    pathRewrite: {
      "^/": "/api/gastronomia/",
    },
  }),
);

app.listen(PORT, () => {
  console.log(`API Gateway ejecutándose en http://localhost:${PORT}`);
});
