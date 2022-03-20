import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import cors from 'cors'
import bookRouter from './routes/bookRouter.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/book', bookRouter);


app.use((req, res, next) => {
    res.status(404).send("Not Found");
})

mongoose.connect('mongodb://localhost:27017/librarydb', { useUnifiedTopology: true }, (err) => {
    if (err) console.log(err);
    app.listen(3001, () => console.log("Сервер ожидает подключения..."))
})

app.listen(3000)