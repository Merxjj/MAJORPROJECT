const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listings = require("../controllers/listings.js");

router.get("/", wrapAsync(listings.index));
router.get("/new", isLoggedIn, listings.renderNewForm);
router.get("/:id", wrapAsync(listings.showListing));
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listings.renderEditForm));
router.post("/", isLoggedIn, validateListing, wrapAsync(listings.createListing));
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listings.updateListing));
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listings.destroyListing));

module.exports = router;