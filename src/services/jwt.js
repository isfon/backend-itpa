import jwt from 'jwt-simple'
import moment from 'moment'
const secret = 'itpa2022'

const createToken = (user) => {
  let payload = {
    id: user._id,
    username: user.email,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
  }
  return jwt.encode(payload, secret)
}

const jwtMethods = {
  createToken
}

export default jwtMethods
