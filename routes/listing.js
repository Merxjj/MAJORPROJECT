const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const ejsMate = require("ejs-mate");
const {ListingSchema,reviewSchema} = require("../schema.js");
const { isLoggedIn } = require("../middleware.js");


// function to validate using joi
const validateListing = (req,res,next)=>{
 let {error} = ListingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}


//Index route for all listings
router.get('/',wrapAsync(async (req,res)=>{
    const allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
}));

//New route for creating a listing
router.get('/new',isLoggedIn,(req,res)=>{
    res.render("listings/new.ejs");
});
//Show route for a single listing
router.get('/:id',wrapAsync(async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error","Listing you requested does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}));
//Edit route to edit particular listing
router.get('/:id/edit',isLoggedIn, wrapAsync(async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/edit",{listing});
}));
//Update route to edit and update the listing
router.put('/:id', 
    isLoggedIn,
    validateListing,
    wrapAsync(async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findByIdAndUpdate(
        id,
        req.body.listing,
        { runValidators: true }
    );
    req.flash("success","Listing Updated");
    console.log("listing updated successfully");
    res.redirect(`/listings/${id}`);
}));
router.delete('/:id',isLoggedIn,wrapAsync(async (req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    console.log("listing deleted successfully");
    req.flash("success","Listing Deleted!");
    res.redirect('/listings');
}));
router.post('/',
    isLoggedIn,
    validateListing,
    wrapAsync(async (req,res,next) =>{
   // let {title , description , price , location ,country} = req.body;
//    let listing = req.body.listing;
//    console.log(listing);
// try{
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send Valid data for listing");
    // }
   
    const listing = new Listing(req.body.listing);
    await listing.save();
    console.log("new listing saved successfully");
    req.flash("success","New Listing Created!");
    res.redirect('/listings');
    // }catch(err){
    //     next(err);
    // }
}));

module.exports = router;