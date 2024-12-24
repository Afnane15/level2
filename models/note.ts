// const mongoose = require('mongoose');
// const { type } = require('os');
// const Schema = mongoose.Schema;

// const noteSchema = new Schema({
//     title: { 
//         type: String,
//         required: true
//     },
//     body:{
//         type: String,
//         required: true
//     }
// }, { timestamps: true});

// export const Notes = mongoose.model('stickyNote', noteSchema);

export interface note {
    title : string;
    body: string;
}