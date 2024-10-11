const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/tilesets');
const mapToken= process.env.MAP_TOKEN;
const geocodingClinet = mbxGeocoding({ accessToken: mapToken });

module.exports.index =async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
 };


 module.exports.renderNew=(req,res)=>{
    res.render("listings/new.ejs");
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
   res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};


module.exports.createListing = async(req,res,next)=>{
    
    let response = await geocodingClinet.forwardGeocode({ //geocode convert place name to cordinates
        query:req.body.listing.location, // for our location
        limit: 1
    })
    .send();

    
    
    let url=req.file.path;
    let filename= req.file.filename;
    // let newListing= new Listing(req.body.listing);
    

    let {title, description, image , price, location , country}= req.body;
    let newListing = new Listing({
        title: title,
        description: description,
        image:image,
        price:price,
        location: location,
        country: country,
    });
    newListing.owner = req.user._id;
    newListing.image={url,filename};//for upload image
    newListing.geometry= response.body.features[0].geometry; // this came from mapBox to store in DB
    
    await newListing.save()
    req.flash("success","New Listing Created");
    res.redirect("/listings");
};


module.exports.editForm=async(req,res)=>{
    let {id} = req.params;
    const listing =await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing You request for does not exist");
        res.redirect("/listings");
         }

         let orignalImageUrl=listing.image.url;
        orignalImageUrl= orignalImageUrl.replace("/upload","/upload/w_250"); //with help of cloduniary api

    res.render("listings/edit.ejs",{listing,orignalImageUrl});
    };

module.exports.updateListing=async (req,res)=>{
    let {id} = req.params;
   let listing= await Listing.findByIdAndUpdate(id, {...req.body.listing});
   // edit image logic 
   if(typeof req.file!="undefined"){//to check filename is not empty
   let url=req.file.path;
   let filename= req.file.filename;

   listing.image={url,filename};
   await listing.save() ;
   }
    req.flash("success","Listing Updated");
    
    res.redirect(`/listings/${id}`);
    };

module.exports.destroyListing=async (req,res)=>{
    let {id} = req.params;
    let deleteListing=await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deletet");

    res.redirect("/listings");
    };