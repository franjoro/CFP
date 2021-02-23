const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = {};

auth.firmar = (data) => {
  const token = jwt.sign({ data , expiresIn: '7 days' }, process.env.JWTPASS);
  return token
};

auth.authcheck = (req, res, next) =>{
  let token = req.cookies.token;
  try {
        jwt.verify(token, process.env.JWTPASS);
        next();
    } catch (error) {
        res.redirect('/');
        return error
    }
}

auth.getUserDataByToken =  (token) =>{
    try {
        return jwt.verify(token, process.env.JWTPASS);
    } catch (error) {
            return error;
    }
}

module.exports = auth;
