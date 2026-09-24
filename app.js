const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const listing = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");

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

app.use("/listings",listing);
app.use("/listings/:id/reviews",reviews);

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