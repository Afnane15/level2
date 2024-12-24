import { Request, Response } from "express";
import { connectDB } from "../config/db";
import { createNote, getNotes} from "../services/noteService";
import { Note } from "../models/noteModel";


export const createNoteController = async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const note: Note = req.body; 
    const result = await createNote(db, note);
    res.status(201).json({ message: "Note créée", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création." });
  }
};


export const getNotesController = async (_req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const notes = await getNotes(db);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des notes" });
  }
};

// // Récupérer un utilisateur par email
// export const getUserByEmailController = async (req: Request, res: Response) => {
//   try {
//     const db = await connectDB();
//     const email = req.params.email; // Récupérer l'email depuis les paramètres de l'URL
//     const user = await getUserByEmail(db, email);

//     if (!user) {
//       res.status(404).json({ error: "Utilisateur non trouvé" });
//     } else {
//       res.status(200).json(user);
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
//   }
// };
