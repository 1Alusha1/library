import mongoose from "mongoose";

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    birthday: Date,
    bookList: Array
},{ versionKey: false })

export default mongoose.model("Author", authorSchema);