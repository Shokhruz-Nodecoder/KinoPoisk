const { knex } = require("../database");
const CustomError = require("../libs/customError");

const isAdmin = async (req, res, next) => {
  try {
    const { user } = req;
  

    if (user.is_admin == false) throw new CustomError(403, "Permission denied");
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = isAdmin;
