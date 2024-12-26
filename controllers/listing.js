const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken= process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index =async (req,res)=>{
    const allListings=await Listing.find({});
   return  res.render("listings/index.ejs",{allListings});
 };


 module.exports.renderNew=(req,res)=>{
    return res.render("listings/new.ejs");
};



module.exports.showListing= async(req,res)=>{
    let {id} = req.params;
    const listing =await Listing.findById(id)
    .populate({path: "reviews", populate: {
       path: "author",
    },
   })
    .populate("Owner");//Populate to show somethig..
    if(!listing){
   req.flash("error","Listing You request for does not exist");
   
   return res.redirect("/listings");
    }
   return res.render("listings/show.ejs",{listing});

};


module.exports.createListing = async(req,res,next)=>{

     const newListing= new Listing(req.body.listing);

     //map
    let response = await geocodingClient.forwardGeocode({ //geocode convert place name to cordinates
        query: newListing.location, // for our location
        limit: 1,
    })
    .send();
   
    
    let url=req.file.path;
    let filename= req.file.filename;
    
    newListing.Owner = req.user._id;
    newListing.image={url,filename};//for upload image
    newListing.geometry= response.body.features[0].geometry; // this came from mapBox to store in DB
    
    await newListing.save();
    
    req.flash("success","New Listing Created");
    
     return res.redirect("/listings");
};


module.exports.editForm=async(req,res)=>{
    let {id} = req.params;
    const listing =await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing You request for does not exist");
       return  res.redirect("/listings");
         }

         let orignalImageUrl=listing.image.url;
        orignalImageUrl= orignalImageUrl.replace("/upload","/upload/h_300,w_250"); //with help of cloduniary api

    return res.render("listings/edit.ejs",{listing,orignalImageUrl});
    };

module.exports.updateListing=async (req,res)=>{
    let {id} = req.params;
   let listing= await Listing.findByIdAndUpdate(id, {...req.body.listing});
   let location= req.body.listing.location;
   // edit image and map logic
   
   if(typeof req.file!="undefined"){//to check filename is not empty
   let url=req.file.path;
   let filename= req.file.filename;

   listing.image={url,filename};
   
   let response = await geocodingClient.forwardGeocode({ //geocode convert place name to cordinates
    query: location,// for our location
    limit: 1,
    })
    .send(); 
    listing.geometry= response.body.features[0].geometry;
    await listing.save();

   }
    
    req.flash("success","Listing Updated");
    
    return res.redirect(`/listings/${id}`);
    
    };

    module.exports.filterListing=async(req,res)=>{
        let filter=req.body.listing.category;
        console.log(filter);
        // return res.redirect("/listings");
    }

module.exports.destroyListing=async (req,res)=>{
    let {id} = req.params;
    let deleteListing=await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Delete");

    return res.redirect("/listings");
    };