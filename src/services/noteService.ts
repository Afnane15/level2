import { Db } from "mongodb";
import { Note } from "../models/noteModel";


export const createNote = async (db: Db, note: Note) => {
  const collection = db.collection<Note>("stickynotes");
  return await collection.insertOne(note);
};


export const getNotes = async (db: Db) => {
  const collection = db.collection<Note>("stickynotes");
  return await collection.find().toArray();
};

// export const getNoteByTitle = async (db: Db, title: string) => {
//   const collection = db.collection<Note>("stickynotes");
//   return await collection.findOne({ title });
// };
