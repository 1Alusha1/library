import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    ganre: Array,
    descr: String,
    author: String,
    path: String
},{ versionKey: false })

export default mongoose.model('Book', bookSchema);