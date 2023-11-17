const Validator = require('fastest-validator')
const models = require('../models')

exports.getPost = async (req, res) => {
  const id = req.params.id

  try {
    const post = await models.Post.findByPk(id)
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: 'Post not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await models.Post.findAll()
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error })
  }
}

exports.createPost = async (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.image_url,
    categoryId: req.body.category_id,
    userId: 1,
  }

  const v = new Validator()

  const schema = {
    title: { type: 'string', optional: false, max: '100' },
    content: { type: 'string', optional: false, max: '500' },
    categoryId: { type: 'number', optional: false },
  }

  const validateResponse = v.validate(post, schema)

  if (validateResponse !== true) {
    res.status(400).json({ message: 'Validation failed', errors: validateResponse })
  } else {
    try {
      const postData = await models.Post.create(post)
      res.status(201).json({ message: 'Post created successfully', postData })
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error })
    }
  }
}

exports.updatePost = async (req, res) => {
  const id = req.params.id
  const userId = 1
  const updatedPost = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.image_url,
    categoryId: req.body.category_id,
  }

  const v = new Validator()

  const schema = {
    title: { type: 'string', optional: false, max: '100' },
    content: { type: 'string', optional: false, max: '500' },
    categoryId: { type: 'number', optional: false },
  }

  const validateResponse = v.validate(updatedPost, schema)

  if (validateResponse !== true) {
    res.status(400).json({ message: 'Validation failed', errors: validateResponse })
  } else {
    try {
      await models.Post.update(updatedPost, { where: { id, userId } })
      res.status(200).json({ message: 'Post updated successfully', updatedPost })
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error })
    }
  }
}

exports.deletePost = async (req, res) => {
  const id = req.params.id

  try {
    const post = await models.Post.destroy({ where: { id } })
    if (post == 0) {
      res.status(404).json({ message: 'Post not found' })
    } else {
      res.status(200).json({ message: 'Post deleted successfully', post })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}
