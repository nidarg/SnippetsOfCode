const Snippet = require('../models/Snippet')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')

const getAllSnippets = async(req,res)=>{
    const{search,sort} = req.query
    const queryObject = {createdBy:req.user._id}
    if(search){
        queryObject.title={$regex:search,$options:'i'}
    }

    let result = Snippet.find(queryObject)

    if(sort === "latest"){
        result = result.sort('-createdAt')
    }
    if(sort === 'oldest'){
        result = result.sort('createdAt')
    }

    const page = Number(req.query.page) || 1
    const limit = req.query.limit || 4
    result = result.skip((page - 1) * limit).limit(limit)

    const snippets = await result.sort('-createdAt')
    const totalSnippets = await Snippet.countDocuments(queryObject)
    const numPages = Math.ceil(totalSnippets / limit)

    res.status(StatusCodes.OK).json({snippets,totalSnippets,numPages})
}

const getSnippet = async(req,res)=>{
    const {id:snippetId} = req.params
    // console.log(snippetId);
    const snippet = await Snippet.findOne({createdBy:req.user._id,_id:snippetId})
    if(!snippet){
        throw new NotFoundError(`Snippet code with id ${snippetId} not found`)
    }
    res.status(StatusCodes.OK).json({snippet})
}

const createSnippet = async(req,res)=>{
    // req.user._id from authMiddleware
   req.body.createdBy = req.user._id
   const snippet = await Snippet.create(req.body)
   res.status(StatusCodes.CREATED).json(snippet)
   console.log(snippet);
}

const updateSnippet = async(req,res)=>{
    const {id:snippetId} = req.params
    const {title,description,code} = req.body
    if(title === '' || code === '') throw new BadRequestError("Title or Code fields cannot be empty")

    const snippet = await Snippet.findOneAndUpdate(
            {createdBy:req.user._id, _id:snippetId},
            req.body,{new:true,runValidators:true}
        )
    if(!snippet){
        throw new NotFoundError(`Snippet code with id ${snippetId} not found`)
    }

    res.status(StatusCodes.OK).json({snippet})
}

const deleteSnippet = async(req,res)=>{
    const {id:snippetId} = req.params
    const snippet = await Snippet.findOneAndDelete({createdBy:req.user._id,_id:snippetId})
    if(!snippet){
        throw new NotFoundError(`Snippet code with id ${snippetId} not found`)
    }

    res.status(StatusCodes.OK).json({snippet})
}   

module.exports = {
    getAllSnippets,
    getSnippet,
    createSnippet,
    updateSnippet,
    deleteSnippet
}