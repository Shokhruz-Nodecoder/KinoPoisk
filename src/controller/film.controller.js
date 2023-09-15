const { knex } = require("../database");
const filmValidation = require("../validations/film.validation");

const create = async (req, res, next) => {
  try {
    const { name, description, year, price, video_url, file, release } =
      req.body;
    console.log(req.body);

    const validationError = filmValidation({
      name,
      description,
      year,
      price,
      video_url,
      file,
      release,
    });
    if (validationError) throw new CustomError(400, "Authentication failed");

    // const film = await knex('film').select('*')
    const [data] = await knex("films")
      .insert({
        name,
        description,
        year,
        price,
        video_url,
        photo: file,
        release,
      })
      .returning("*");

    res.status(200).json({ message: "Success", data });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await knex("films").select("*").where({ id }).first();

    if (data?.release > new Date()) {
      delete data?.video_url;
    }

    res.status(200).json({ message: "Success", data });
  } catch (error) {
    next(error);
  }
};

const Search = async (req, res, next) => {
 try {
  const { year, search, fromPrice, toPrice, release } = req.query;



  console.log(req.query); 
  let query = knex("films").select("*");

  if (year) {
    query = query.where({ year });
  }

  if (search) {
    query = query.whereILike("name", `%${search}%`);
  }

  if (fromPrice) {
    query = query.where("price", ">=", fromPrice);
  
  }

  if (toPrice) {
    query = query.where("price", "<=", toPrice);
  }

  if (release === "true") {
    query = query.where("release", ">=", new Date());
  }

  const data = await query
  res.status(200).json({ message: "Search", data});
 } catch (error) {
  next(error)
 }
};
module.exports = { create, findOne, Search};
