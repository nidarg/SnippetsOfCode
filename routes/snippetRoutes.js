
const {getAllSnippets,getSnippet,createSnippet,updateSnippet,deleteSnippet} = require('../controllers/snippetController')

const express = require('express')
const router = express.Router()

router.route('/').get(getAllSnippets).post(createSnippet)
router.route('/:id').get(getSnippet).delete(deleteSnippet).patch(updateSnippet)
module.exports = router