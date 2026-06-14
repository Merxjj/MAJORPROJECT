const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");
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
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.get('/', (req, res) => {
  res.send('App running on port 8080');
});

//Index route for all listingsi
app.get('/listings',async (req,res)=>{
    const allListing = await Listing.find({});
    res.render("listings/index.ejs",{allListing});
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