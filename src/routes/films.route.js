const {Router} = require("express");
const { register, login, changePassword } = require("../controller/auth.controller");
const isAuth = require("../middlewares/isAuth.middleware");
const { create, findOne, Search } = require("../controller/film.controller");
const currentUser = require("../middlewares/currentUser.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");
const fileUpload = require("../middlewares/fileupload.middleware");

const router = new Router()

router.post('/film',isAuth, currentUser, isAdmin, fileUpload, create)
router.get("/film/:id", findOne)
router.get("/film", Search)


module.exports = router;