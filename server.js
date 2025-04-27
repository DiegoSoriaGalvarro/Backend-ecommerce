const express = require("express");
const cors = require("cors");
const path = require("path");
const { fileURLToPath } = require("url");
const connectDB = require("./config/db.js"); // Importar conexión MongoDB
const dotenv = require('dotenv'); 

const usuarioRoutes = require("./routes/usuarioRoutes.js");
const productoRoutes = require("./routes/productoRoutes.js");
const pedidoRoutes = require("./routes/pedidoRoutes.js");
const pagosRoutes = require("./routes/pagosRoutes.js");

dotenv.config(); // Cargar variables de entorno

const app = express();
connectDB();

// Para poder usar __dirname en módulos ESTATICOS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Habilitar CORS
const allowedOrigins = [
   "https://difabios-tienda.glitch.me",  // Frontend en producción
   "http://localhost:3000"              // Frontend en desarrollo
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  }
}));
app.use(express.json());

// Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/pagos", pagosRoutes);

// ----------------------------------------------
// Solo en producción: servir archivos estáticos
if (process.env.NODE_ENV === "production") {
  const __publicPath = path.join(__dirname, "public");
  app.use(express.static(__publicPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__publicPath, "index.html"));
  });
}
// ----------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));


