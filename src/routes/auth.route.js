const {Router} = require("express");
const { register, login, changePassword } = require("../controller/auth.controller");

const router = new Router()

router.post("/auth/login", login);
router.post("/auth/register", register);
// router.post("/teacher/settings/newpass", changePassword);



module.exports = router;