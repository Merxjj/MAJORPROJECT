const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
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
app.get('/', (req, res) => {
  res.send('App running on port 8080');
});

//Index route for all listings
app.get('/listings',async (req,res)=>{
    const allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
});

//New route for creating a listing
app.get('/listings/new',(req,res)=>{
    res.render("listings/new.ejs");
});

app.post('/listings',async (req,res) =>{
   // let {title , description , price , location ,country} = req.body;
//    let listing = req.body.listing;
//    console.log(listing);
    const listing = new Listing(req.body.listing);
    await listing.save();
    console.log("new listing saved successfully");
    res.redirect('/listings');
});
//Show route for a single listing
app.get('/listings/:id',async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});
//Edit route to edit particular listing
app.get('/listing/:id/edit',async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit",{listing});
});
//Update route to edit and update the listing
app.put('/listings/:id',async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findByIdAndUpdate(id,req.body.listing);
    console.log("listing updated successfully");
    res.redirect(`/listings/${id}`);
});
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

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});