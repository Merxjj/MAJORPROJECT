const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const users = require("../controllers/users.js");

router.get("/signup", users.renderSignupForm);
router.post("/signup", wrapAsync(users.signup));

router.get("/login", users.renderLoginForm);

router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    users.login
);

router.get("/logout", users.logout);

module.exports = router;