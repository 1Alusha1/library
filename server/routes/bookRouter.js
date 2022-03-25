import express from 'express'
import { postCreateBooks, getBooks, getBook, putChangeBook, postCreateAuthor, removeBook, downloadBook } from '../controller/bookController.js'

const bookRouter = express.Router();

bookRouter.get('/getbooks', getBooks)
bookRouter.get('/getbook/:id', getBook)
bookRouter.get('/downloadbook/:id/:name', downloadBook)

bookRouter.put('/changebook', putChangeBook)

bookRouter.post('/removebook', removeBook)
bookRouter.post('/createbook', postCreateBooks)
bookRouter.post('/createauthor', postCreateAuthor)



export default bookRouter;