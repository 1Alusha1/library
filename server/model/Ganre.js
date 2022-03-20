import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ganreSchema = new Schema({
    name: String,
    books: Array
},{ versionKey: false })

export default mongoose.model('Ganre', ganreSchema)