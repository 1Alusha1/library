import Book from "../model/Book.js";
import Author from "../model/Author.js";
import Ganre from "../model/Ganre.js";

import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import  fs  from "fs";

export const downloadBook = (req, res) => {
    res.download(`D:/js/projects/library/server/uploads/${req.params.id}/${req.params.name.split(' ').join('')}.rar`)
}

export const getBooks = (req, res) => {
    Book.find({}, (err, books) => {
        if (err) console.log(err);
        res.send(books);
    });
};

export const getBook = (req, res) => {
    Book.find({ _id: req.params.id }, (err, book) => {
        if (err) console.log(err)
        res.send(book)
    })
}

export const removeBook = (req, res) => {
    const body = req.body
    Ganre.findOneAndUpdate({ name: body.ganre[0] }, { $pull: { books: body.name } }, (err) => err ? console.log(err) : false)
    Author.findOneAndUpdate({ name: body.author }, { $pull: { bookList: body.name } }, (err) => err ? console.log(err) : false)

    Book.deleteOne({ _id: body._id }, (err, doc) => {
        if (err) console.log(err)
        res.send(doc)
    })
}

export const putChangeBook = (req, res) => {
    const id = req.body.data.id;
    const name = req.body.data.name;
    const descr = req.body.data.descr;

    Book.findOneAndUpdate({ _id: id }, { $set: { name: name, descr: descr } }, (err, doc) => {
        if (err) console.log(err);
        res.send({})
    })
}

export const postCreateBooks = (req, res) => {
    let book = new Book({
        name: req.body.name,
        ganre: req.body.ganre,
        descr: req.body.descr,
        author: req.body.author,
        path: `../uploads/`,
    });
    let author = new Author({
        name: req.body.author,
        birthday: null,
        bookList: req.body.name,
    });
    let ganre = new Ganre({
        name: req.body.ganre,
        books: req.body.name,
    });
    /**
     * При содании книги проверяем если в бд автор написавший книгу
     * если нет то создаем его и добавляем в массив написаных автором книг созданную книгу
     * с жанрами точно такой же принцип
     */
    Author.find({ name: req.body.author }, (err, doc) => {
        if (err) console.log(err);
        if (doc.length) {
            Author.findOneAndUpdate(
                { name: req.body.author },
                { $push: { bookList: req.body.name } },
                (err, doc) => {
                    if (err) console.log(err);
                    book.save((err) => {
                        if (err) console.log(err);
                    });
                }
            );
        } else {
            author.save((err) => {
                if (err) console.log(err);

                book.save((err) => {
                    if (err) console.log(err);
                });
            });
        }
    });
    Ganre.find({ name: req.body.ganre }, (err, doc) => {
        if (err) console.log(err);
        if (doc.length) {
            Ganre.findOneAndUpdate(
                { name: req.body.ganre },
                { $push: { books: req.body.name } },
                (err, doc) => {
                    if (err) console.log(err);
                }
            );

            book.save((err) => {
                if (err) console.log(err);
            });
        } else {
            ganre.save((err) => {
                if (err) console.log(err);
                book.save((err) => {
                    if (err) console.log(err);
                });
            });
        }
    });
    res.send({})
};



export const postCreateAuthor = (req, res) => {
    let author = new Author({
        name: req.body.name,
        birthday: req.body.birthday,
        books: req.body.books,
    });

    author.save((err) => {
        if (err) console.log(err);
    });
};

