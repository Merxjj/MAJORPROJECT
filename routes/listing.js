const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listings = require("../controllers/listings.js");

router.route("/")
    .get(wrapAsync(listings.index))
    .post(isLoggedIn, validateListing, wrapAsync(listings.createListing));

router.get("/new", isLoggedIn, listings.renderNewForm);

router.route("/:id")
    .get(wrapAsync(listings.showListing))
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listings.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listings.destroyListing));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listings.renderEditForm));

module.exports = router;