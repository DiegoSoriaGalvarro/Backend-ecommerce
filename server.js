import express from "express";       // 
import cors from "cors";             // 
import path from "path";             // 
import dotenv from "dotenv";         //
import connectDB from "./config/db.js"; // Importar conexión MongoDB

import usuarioRoutes from "./routes/usuarioRoutes.js";   // 
import productoRoutes from "./routes/productoRoutes.js"; // 
import pedidoRoutes from "./routes/pedidoRoutes.js";     //
import pagosRoutes from "./routes/pagosRoutes.js";       // U

dotenv.config(); // Cargar variables de entorno

const app = express();
connectDB();

// Para poder usar __dirname en módulos ESTATICOS
// En los módulos ES, no se puede usar __dirname directamente.
// Necesitamos una forma diferente de obtener la ruta del directorio actual:
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Habilitar CORS
const allowedOrigins = [
  "https://difabios-tienda.glitch.me", // Frontend en producción
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

// Solo en producción: servir archivos estáticos
if (process.env.NODE_ENV === "production") {
  const __publicPath = path.join(__dirname, "public");
  app.use(express.static(__publicPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__publicPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));



