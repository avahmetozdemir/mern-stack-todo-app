import Todos from "../models/Todos.js"

export const createTodo = async (req,res,next)=> {
    const newTodo = new Todos(req.body)
    try {
    const savedTodo= await  newTodo.save()
    res.status(201).json(savedTodo)
    } catch (error) {
        next(error)
    }
}

export const getTodos =async (req,res,next)=> {
    
    const userId= req.params.id
    
    try {
        const todos = await Todos.find({id: userId})
        res.status(200).json(todos)
    } catch (error) {
        next(error)
    }
}

 export const deleteTodo = async (req,res,next)=> {
    try {
        await Todos.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status:'success',
            message: 'Todo is deleted'
        })
    } catch (error) {
        next(error)
    }

 }

 export const updateTodo = async (req,res,next)=> {
    try {
       const updatedTodo =  await Todos.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updateTodo)
    } catch (error) {
        next(error)
    }

 }