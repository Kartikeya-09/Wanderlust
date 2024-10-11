const mongoose= require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Connected to DB");
}).catch(()=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB =  async ()=>{
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=>({...obj, Owner: '66c6f7b371b50a94480bd27e'}));//To add new Property in Schema.
    await Listing.insertMany(initData.data);
    console.log("Data was initialised");
};

initDB();