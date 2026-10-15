const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {
    isLoggedIn,
    isReviewAuthor,
    validateReview
} = require("../middleware.js");
const reviews = require("../controllers/reviews.js");

router.route("/")
    .post(
        isLoggedIn,
        validateReview,
        wrapAsync(reviews.createReview)
    );

router.route("/:reviewId")
    .delete(
        isLoggedIn,
        isReviewAuthor,
        wrapAsync(reviews.destroyReview)
    );

module.exports = router;