import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

const connectDB = async () => {
  try {
    // Configurar strictQuery antes de la conexión
    mongoose.set('strictQuery', false);  // Cambiar a 'true' para suprimir la advertencia

    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB conectado: ${connection.connection.host}`);
  } catch (error) {
    console.error(`❌ Error de conexión a MongoDB: ${error.message}`);
    process.exit(1); // Detiene el servidor si falla la conexión
  }
};

export default connectDB;



