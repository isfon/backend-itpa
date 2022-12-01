import jwt from 'jwt-simple'
import moment from 'moment'

const secret = 'itpa2022'

const ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({mensaje: 'Error de autorización.'})
  }
  const token = req.headers.authorization.replace(/['"]+/g, '')
  let payload
  try {
    payload = jwt.decode(token, secret)
    if (payload.exp <= moment().unix()) {
      res.statusCode= 401
      return res.send({mensaje: 'Token de autorización expirado.'})
    }
  } catch (error) {
     res.statusCode = 401
     return res.send({mensaje: 'Token de autorización invalido.'})
  }

  req.user = payload
  next()
}
  
export default ensureAuth