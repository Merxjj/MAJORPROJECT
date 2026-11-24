//all the initialization logic is written here
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
}

const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL || process.env.MONGO_URL || MONGO_URL;

main()
    .then(()=>{
    console.log("connected to DB");
})
    .catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(dbUrl);
}

const initDB = async () => {
    await Listing.deleteMany({});

    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: process.env.SEED_OWNER_ID || "6acaf35fb1d7e58ef6610fdd",
    }));

    await Listing.insertMany(initData.data);

    console.log("data was initialized");
    await mongoose.connection.close();
};
initDB();