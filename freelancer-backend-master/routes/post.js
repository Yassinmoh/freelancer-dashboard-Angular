const express = require('express');
const router = express.Router();

const post = require('../controller/post');

router.get('/all', post.listAllPost)
router.get('/one', post.listOnePost)
router.get('/', post.paginate)
router.post('/', post.createPost)
router.put('/:id', post.updatePost)
router.delete('/:id', post.deletePost)


module.exports = router