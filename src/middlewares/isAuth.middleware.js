const CustomError = require("../libs/customError");
const { verify } = require("../libs/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token =
      req.headers?.authorization ?? req.headers?.authorization.split(" ")[1];
    if (!token) {
      throw new CustomError(401, "Invalid authorization token provided");
    } else {
      
      const data = verify(token);
      if (!data) throw new CustomError(401, "Invalid token");
      req.verify = data;
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = isAuth;
