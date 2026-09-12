const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {ListingSchema} = require("./schema.js");
main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));


app.get('/', (req, res) => {
  res.send('App running on port 8080');
});

//Index route for all listings
app.get('/listings',wrapAsync(async (req,res)=>{
    const allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
}));

//New route for creating a listing
app.get('/listings/new',(req,res)=>{
    res.render("listings/new.ejs");
});

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
app.post('/listings',
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
    res.redirect('/listings');
    // }catch(err){
    //     next(err);
    // }
}));
//Show route for a single listing
app.get('/listings/:id',wrapAsync(async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
}));
//Edit route to edit particular listing
app.get('/listings/:id/edit', wrapAsync(async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit",{listing});
}));
//Update route to edit and update the listing
app.put('/listings/:id', 
    validateListing,
    wrapAsync(async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findByIdAndUpdate(
        id,
        req.body.listing,
        { runValidators: true }
    );
    console.log("listing updated successfully");
    res.redirect(`/listings/${id}`);
}));
app.delete('/listings/:id',wrapAsync(async (req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    console.log("listing deleted successfully");
    res.redirect('/listings');
}));
// app.get('/testListing', async (req,res) => {
//     const sampleListing = new Listing({
//         title: "My new villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute,Goa",
//         country:"India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("succesfull testing");
// });

// app.all("*",(req,res,next)=>{
//     next(new ExpressError(401,"Page not Found"));
// });
// app.use((err,req,res,next)=>{
//     let {statusCode,message} = err;
//     res.status(statusCode).send("Something went wrong");
// });
// app.listen(port, () => {
//     console.log(`App listening at http://localhost:${port}`);
// });
app.all("/{*splat}", (req, res, next) => {
    next(new ExpressError(404, "Page not Found"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{err});
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});