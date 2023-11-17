const jwt = require('jsonwebtoken')

exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] // Bearer Token $eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eys
    const decondedToken = jwt.verify(token, 'jwtsecret')
    req.userData = decondedToken
    // console.log(req.userData)
    // console.log(req)
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Invalid or expired token provided', error })
  }
}

// to be able to login using basic auth
// exports.checkAuth = async (req, res, next) => {
//   try {
//     const authorization = req.headers.authorization // Bearer Token $eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eys
//     const encoded = authorization.split(' ')[1]
//     const decodeded = Buffer.from(encoded, 'base64').toString('ascii')
//     const [email, password] = decodeded.split(':')
//     const authenticatedUser = await models.User.findOne({ where: { email } })

//     const match = await bcrypt.compare(password, authenticatedUser.password)

//     if (!authorization) {
//       return res.status(403).json({ message: 'Forbidden' })
//     }

//     if (!authenticatedUser) {
//       return res.status(403).json({ message: 'Forbidden' })
//     }

//     if (!match) {
//       return res.status(400).json({ message: 'The password is wrong' })
//     }

//     console.log(req.params.id)
//     next()
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid or expired token provided', error })
//   }
// }

// exports.checkAuth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1] // Bearer Token $eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eys
//     const decondedToken = jwt.verify(token, 'secret')
//     req.userData = decondedToken
//     next()
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid or expired token provided', error })
//   }
// }

// exports.checkAuth = (req, res, next) => {
//   const token = req.cookies.access_token

//   if (!token) {
//     jwt.verify(token, 'secret', (err, decondedToken) => {
//       if (err) {
//         console.log(err.message)
//         res.redirect(301, '/')
//       } else {
//         console.log(decondedToken)
//         next()
//       }
//     })
//   } else {
//     req.redirect('/')
//   }
// }
