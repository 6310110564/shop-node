const jwt = require('jsonwebtoken')
const config = process.env;

const authenticateToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    
    if(!token) {
        return res.status(403).send({
            success: false,
            message: "A token is required for authentication"
        })
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY)
        req.user = decoded
        return next();

    } catch (error) {
        return res.status(401).send({
            success: false,
            status: 401,
            message: (error.toString(error))
        })
    }
}

const checkAdmin = (req, res, next) => {
    const admin = req.user && req.user.admin;

    console.log(admin)
  
    if (!admin) {
      return res.status(403).send({
        success: false,
        status: 403,
        message: "Access denied"
      });
    }
  
    next();
  };
  
  module.exports = {
    authenticateToken,
    checkAdmin
  };

// module.exports = authenticateToken