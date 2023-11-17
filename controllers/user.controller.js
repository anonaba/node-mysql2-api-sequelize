const models = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signup = async (req, res) => {
  try {
    const project = await models.User.findOne({ where: { email: req.body.email } })
    if (project) {
      res.status(409).json({ message: 'Email already exists' })
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, async function (err, hash) {
          const user = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
          }

          try {
            const userData = await models.User.create(user)
            res.status(201).json({ message: 'User created successfully', userData })
          } catch (error) {
            res.status(500).json({ message: 'Something went wrong', error })
          }
        })
      })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }

  // var salt = bcrypt.genSaltSync(10)
  // var hash = bcrypt.hashSync(req.body.password, salt)

  // const user = {
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: hash,
  // }

  // try {
  //   const userData = await models.User.create(user)
  //   res.status(201).json({ message: 'User created successfully', userData })
  // } catch (error) {
  //   res.status(500).json({ message: 'Something went wrong', error })
  // }
}

exports.login = async (req, res) => {
  try {
    const foundUser = await models.User.findOne({ where: { email: req.body.email } })

    if (foundUser === null) {
      res.status(401).json({ message: 'Invalid Creadentials' })
    } else {
      const isPasswordCorrect = bcrypt.compareSync(req.body.password, foundUser.password)

      if (!isPasswordCorrect) return res.status(400).json({ message: 'The password is wrong' })

      const { password, ...others } = foundUser.dataValues
      // important part
      const token = jwt.sign({ email: foundUser.email, userId: foundUser.id }, 'jwtsecret')

      res.cookie('access_token', token, { httpOnly: true })
      res.status(200).json({ message: 'Authentication successfull', others, access_token: token })

      // res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}
exports.profile = async (req, res) => {
  const { userId } = req.userData
  try {
    const foundUser = await models.User.findOne({ where: { id: userId } })
    res.status(200).json(foundUser)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error })
  }
}
