import express from "express"
import {createTodo,getTodos,deleteTodo,updateTodo} from "../controllers/Todos.js"

const router = express.Router()

router.get('/:id',getTodos)
router.post('/create',createTodo)
router.delete('/:id',deleteTodo)
router.put('/:id',updateTodo )


export default router