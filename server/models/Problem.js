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
    writer:{

    },
    like:{
        type:Number,
        default:0
    },
    dislike:{
        type:Number,
        default:0
    },
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