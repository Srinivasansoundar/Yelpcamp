const express = require("express")
// const flash=require("connect-flash")
const router = express.Router();
const passport = require("passport")
const castchAsync = require("../utils/catchAsync")
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const {storeReturnTo}=require("../middleware")
// router.use(flash())
const users=require("../controllers/user")
router.route("/register")
    .get(users.renderRegister)
    .post(catchAsync(users.register))
router.route("/login")
    .get(users.renderLogin )
    .post(storeReturnTo, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), users.login)
//passport.authenticate invokes req.login automatically
router.get("/logout", users.logout)
module.exports = router