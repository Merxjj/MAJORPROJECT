const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {
    isLoggedIn,
    isReviewAuthor,
    validateReview
} = require("../middleware.js");
const reviews = require("../controllers/reviews.js");

// Create Review Route
router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviews.createReview)
);

// Delete Review Route
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviews.destroyReview)
);

module.exports = router;