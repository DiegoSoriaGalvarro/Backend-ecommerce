import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js"; // Importar conexión MongoDB
import dotenv from 'dotenv'; 

import usuarioRoutes from "./routes/usuarioRoutes.js"; // 
import productoRoutes from "./routes/productoRoutes.js"; // 
import pedidoRoutes from "./routes/pedidoRoutes.js"; // 
import pagosRoutes from "./routes/pagosRoutes.js"; // 


dotenv.config(); // Cargar variables de entorno

const app = express();
connectDB();

// Para poder usar __dirname en módulos ESTATICOS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Habilitar CORS
const allowedOrigins = [
  "https://difabios-tienda.glitch.me",
  "http://localhost:3000"
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

// Servir archivos estáticos de la carpeta public
app.use(express.static(path.join(__dirname, "public")));

//  Para cualquier ruta que no sea API, mandar el index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));

