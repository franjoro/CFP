const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = {};

auth.firmar = (data) => {
  let token = jwt.sign({ data:data , expiresIn: '7 days' }, process.env.JWTPASS);
  return token
};

auth.authcheck = (req, res, next) =>{
    let token = req.header.auth;
    try {
        jwt.verify(token, process.env.JWTPASS);
        next();
    } catch (error) {
        res.redirect('/');
        return error
    }
}

module.exports = auth;
