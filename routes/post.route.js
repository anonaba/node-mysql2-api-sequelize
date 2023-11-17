const express = require('express')
const router = express.Router()

const postController = require('../controllers/post.controller.js')
const checkAuthMiddleWare = require('../middleware/check-auth.js')

router.get('/posts', postController.getAllPosts)
router.get('/posts/:id', postController.getPost)

router.post('/posts', checkAuthMiddleWare.checkAuth, postController.createPost)
router.post('/posts/:id', checkAuthMiddleWare.checkAuth, postController.updatePost)
router.delete('/posts/:id', checkAuthMiddleWare.checkAuth, postController.deletePost)

// router.get('/posts', postController.getAllPosts)
// router.get('/posts/:id', postController.getPost)

// router.post('/posts', postController.createPost)
// router.post('/posts/:id', postController.updatePost)

// router.delete('/posts/:id', postController.deletePost)

module.exports = router
