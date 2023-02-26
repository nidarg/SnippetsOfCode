const mongoose = require('mongoose')

const SnippetSchema = new mongoose.Schema({

    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide a user']
    },
    title:{
        type:String,
        required:[true,'Please provide Title']
    },
    description:{
        type:String
    },
    code:{
        type:String,
        required:[true,"Please add code snippet"]
    }

},{timestamps:true})

module.exports = mongoose.model("Snippet",SnippetSchema)