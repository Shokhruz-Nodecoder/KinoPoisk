const CustomError = require("../libs/customError");

const errorHandler = (error, req, res,next) => {
  if (error instanceof CustomError) {
    return res.status(error.status).json({ error: error.message });
} else {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = errorHandler;
