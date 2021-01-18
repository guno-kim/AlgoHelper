const mongoose=require('mongoose')

const problemSchema=mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    variables:{
        type:Array
    },
    inputBlocks:{
        type:Array
    },
    testCodes:{
        type:Object
    },
    public:{
        type:Boolean
    }

})

const Problem=mongoose.model('Problem',problemSchema)

module.exports={Problem}