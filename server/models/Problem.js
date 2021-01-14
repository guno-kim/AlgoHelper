const mongoose=require('mongoose')

const problemSchema=mongoose.Schema({
    id:{
        type:String,
        unique:true,
        required:true
    },
    title:{
        type:String
    },
    variables:{
        type:Array
    }
})

const Problem=mongoose.model('Problem',problemSchema)

module.exports={Problem}