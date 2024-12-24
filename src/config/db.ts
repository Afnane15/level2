import { MongoClient, Db } from "mongodb";

const dbURI = "mongodb+srv://afnane15:afnane2001@cluster0.70sdi.mongodb.net/stickynote?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(dbURI);

let db: Db;

export const connectDB = async (): Promise<Db> => {
  if (db) return db; // Retourne la connexion existante

  try {
    await client.connect();
    console.log("MongoDB connecté !");
    db = client.db("stickynote"); // Nom de la base de données
    return db;
  } catch (error) {
    console.error("Erreur de connexion à MongoDB :", error);
    process.exit(1); // Arrêter le processus en cas d'échec
  }
};

