import express, { Application, Request, Response } from "express";

import { connectDB } from "./config/db";
import {
  createNote,
  getNotes,
} from "./services/noteService"; 

const app: Application = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./src/views");

// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(express.static("./src/public"));
app.use(express.urlencoded({ extended: true }));

// Route pour la page d'accueil
app.get("/list", async (_req: Request, res: Response) => {
  const db = await connectDB();
  const notes = await getNotes(db); 
  res.render("list", { item: notes }); 
});


app.get("/add", (_req: Request, res: Response) => {
  res.render("add"); 
});

// Route pour soumettre un nouvel utilisateur
app.post("/add", async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const { title, body } = req.body;
    await createNote(db, { title, body });
    res.redirect("/list"); // Redirige vers la page d'accueil après l'insertion
  } catch (error) {
    res.status(500).send("Erreur lors de la création.");
  }
});



// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
