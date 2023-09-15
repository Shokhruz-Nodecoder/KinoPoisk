const { Router } = require("express");

const isAuth = require("../middlewares/isAuth.middleware");
const currentUser = require("../middlewares/currentUser.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");
const { changeBalance, find, create, statistics } = require("../controller/user.controller");

const router = new Router();

router.post("/user/payment", isAuth, currentUser, changeBalance);
router.get("/users", isAuth, currentUser, isAdmin, find);
router.post("/user/create", isAuth, currentUser, isAdmin, create);
router.get("/user/statistics", isAuth, currentUser, isAdmin, statistics)

module.exports = router;
