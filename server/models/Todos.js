import mongoose from 'mongoose'

const todosSchema = new mongoose.Schema({
    text : String,
    checked: Boolean,
    id:String
})

const Todos =  mongoose.model('Todos', todosSchema)

export default Todos