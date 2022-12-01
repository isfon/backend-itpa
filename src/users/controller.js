import User from './model'
import jwt from '../services/jwt'

const create = async (req, res) => {
  const newUser = await User.create({
     name: req.body.name,
     email: req.body.email,
     password: req.body.password
  })

  if (!newUser)
    return res.status(400).json({
      status: 'failed',
      message: `Can't create user due to invalid details`,
    })

  res.status(200).json({
    status: 'success',
    user: newUser
  })
}

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    //  check email and password exist
    return next(new AppError(' please proveide email and password ', 400));
  }

  const user = await User.findOne({ email }).select('+password'); // select expiclity password

  if (!user) {
    res.statusCode = 404
    return res.send({ message: 'User not found'});
  }
  if (!user || !(await user.correctPassword(password, user.password))) {
    // candinate password,correctpassword
    res.statusCode = 401
    return res.send({ message: 'Password incorrect'});
  }

  //create token
  const token = await jwt.createToken(user)
  res.send({
    user,
    token
  })
}

const controller = {
  create,
  login
}

export default controller
