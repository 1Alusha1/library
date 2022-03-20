import Book from "../model/Book.js";
import Author from "../model/Author.js";
import Ganre from "../model/Ganre.js";

export const getBook = (req, res) => {
    Book.find({}, (err, books) => {
        if (err) console.log(err);
        res.send(books);
    });
};

export const postCreateBook = (req, res) => {
    let book = new Book({
        name: req.body.name,
        ganre: req.body.ganre,
        descr: req.body.descr,
        author: req.body.author,
        path: "../upload",
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

