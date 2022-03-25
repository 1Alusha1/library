import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors'
import bookRouter from './routes/bookRouter.js';
import fs from 'fs'
import path from 'path';


import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.json());

function createDir(name) {

    fs.mkdir(path.join('uploads', name), (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });
}


const storageConfig = multer.diskStorage({

    destination: async (req, file, cb) => {
        console.log(req.url.split('/').slice(2).join())
        await createDir(req.url.split('/').slice(2).join());

        cb(null, `${__dirname}/uploads/${req.url.split('/').slice(2).join()}`);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
app.use(multer({ storage: storageConfig }).single('filedata'))


app.use('/book', bookRouter);

app.post('/upload/:id', (req, res) => {
    let filedata = req.file;
    console.log(filedata);
    if (!filedata)
        res.send("Ошибка при загрузке файла");
    else {
        res.redirect('http://localhost:8080/books')
    }
})

app.use((req, res, next) => {
    res.status(404).send("Not Found");
})

mongoose.connect('mongodb://localhost:27017/librarydb', { useUnifiedTopology: true }, (err) => {
    if (err) console.log(err);
    app.listen(3001, () => console.log("Сервер ожидает подключения..."))
})

app.listen(3000)