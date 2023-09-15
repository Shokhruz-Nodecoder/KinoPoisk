const bcrypt = require("bcrypt");
const jwt = require("../libs/jwt");
const { generateHash, compareHash } = require("../libs/bcrypt");
const { jwtSecretKey } = require("../../config");
const authValidation = require("../validations/auth.validation");
const loginValidation = require("../validations/login.validation");
const CustomError = require("../libs/customError");
const { knex } = require("../database");

const register = async (req, res, next) => {
  try {
    const { username, password, fullname } = req.body;
    console.log(req.body)

    const validationError = authValidation({
      username,
      password,
      fullname,
    });
    if (validationError) throw new CustomError(400, "Authentication failed");

    const user = await knex("users")
      .select("*")
      .where({ username: username.toLowerCase() })
      .first();

    if (user) throw new CustomError(409, "Username already in use");

    const generate = await generateHash(password);
    console.log(generate)
    const [newUser] = await knex("users")
      .insert({
        username: username.toLowerCase(),
        password: generate,
        fullname,
      })
      .returning("*");

    const token = jwt.sign({ id: newUser.id });

    res.status(201).json({ message: "User successfully created", token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res,next) => {
  try {
    const { username, password } = req.body;

    const validationError = loginValidation({
      username,
      password,
    });
    if (validationError) throw new CustomError(400, "Authentication failed");

    const user = await knex("users")
      .select("*")
      .where({ username: username.toLowerCase() })
      .first();

    if (!user) throw new CustomError(403, "Invalid username or password");

    const compare = await compareHash(password, user.password);
    if (!compare) {
      throw new CustomError(403, "Authentication failed");
    }
    const token = jwt.sign({ id: user.id });

    res.status(201).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

// const changePassword = async (req, res) => {
//   try {
//     const { password, newpass, renewpass } = req.body;
//     const { token } = req.cookies;
//     const decodedToken = jwt.verify(token, jwtSecretKey);
//     const userId = decodedToken.userId;

//     const user = await Users.findByPk(userId, { logging: false });
//     const compare = await compareHash(password, user.password);

//     if (!compare) {
//       return res.status(404).json({ message: "Invalid password" });
//     } else if ( newpass === renewpass) {
//       const generate = await generateHash(newpass);
//       user.password = generate;
//       await user.save({ logging: false });
//       res.status(201).json({ message: "Successfully changed password" });
//     } else {
//       res.status(403).json({
//         message:
//           "Error something email or new Password or return new Password ",
//       });
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };

module.exports = {
  login,
  register,
  // changePassword,
};
