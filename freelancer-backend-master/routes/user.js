const express = require("express");
const router = express.Router();

const users = require("../controller/user");

//sign up new user
router.post("/", users.signUp);
//login user
router.post("/login", users.login);
// //show all users
router.get("/", users.ShowallUser);
// //update user
router.put("/:id", users.updateUser);
// // delete user
router.delete("/:id", users.deleteUser);
//all admin
router.get("/admin",users.Showalladmin)
module.exports = router;
