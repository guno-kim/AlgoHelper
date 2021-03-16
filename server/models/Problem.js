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
    like:[mongoose.Schema.Types.ObjectId],
    dislike:[mongoose.Schema.Types.ObjectId],
    date:{
        type:Date,
        default:Date.now
    },
    writer:{
        type:String,
        ref:'User'
    }

})

const Problem=mongoose.model('Problem',problemSchema)

module.exports={Problem}