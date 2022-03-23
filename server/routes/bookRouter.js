import express from 'express'
import { postCreateBooks,getBooks,getBook,putChangeBook, postCreateAuthor, removeBook } from '../controller/bookController.js'

const bookRouter = express.Router();

bookRouter.get('/getbooks', getBooks)
bookRouter.get('/getbook/:id', getBook)
bookRouter.put('/changebook', putChangeBook)
bookRouter.post('/removebook', removeBook)
bookRouter.post('/createbook', postCreateBooks)
bookRouter.post('/createauthor', postCreateAuthor)


export default bookRouter;