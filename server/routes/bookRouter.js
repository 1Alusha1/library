import express from 'express'
import { postCreateBook,getBook, postCreateAuthor } from '../controller/bookController.js'

const bookRouter = express.Router();

bookRouter.get('/getbook', getBook)
bookRouter.post('/createbook', postCreateBook)
bookRouter.post('/createauthor', postCreateAuthor)


export default bookRouter;