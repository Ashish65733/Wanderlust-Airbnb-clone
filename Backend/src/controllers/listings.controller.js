import Listing from "../models/listing.model.js";
import axios from "axios"; 

export const index = async (req, res) => {
  let { category } = req.query;
    
    // If a category is selected, filter by it, otherwise get all
    let allListings;
    if (category && category.length > 0) {
        allListings = await Listing.find({ category: { $in: [category] } });
    } else {
        allListings = await Listing.find({});
    }
  res.render("listings/index.ejs", { allListings, currentCategory: category || "" });
};

export const renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

export const showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you request for does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show", {
    listing,
    mapToken: process.env.MAP_TOKEN,  
  });
};

export const createListing = async (req, res) => {
  // if (!req.body.listing) {
  //   throw new ExpressError(400, "Send valid data for listing");
  // }

  // let result = listingSchema.validate(req.body);
  // console.log(result);
  // if (result.error) {
  //   throw new ExpressError(400, result.error);
  // }
  let url = req.file.path;
  let filename = req.file.filename;

  const { location, country } = req.body.listing;

   // Geocode the location using MapTiler API
  const geoRes = await axios.get(
    `https://api.maptiler.com/geocoding/${encodeURIComponent(location + ", " + country)}.json?key=${process.env.MAP_TOKEN}`
  );

  const coords = geoRes.data.features[0]?.geometry?.coordinates || [0, 0];

  const newListing = new Listing({
    ...req.body.listing,
    owner: req.user._id,
    image: { url, filename },
    geometry: {
      type: "Point",
      coordinates: coords,  // [lng, lat] from MapTiler
    },
  });

  // if(!newListing.title){
  //   throw new ExpressError(400, "Title is missing!");
  // }
  // if(!newListing.description){
  //   throw new ExpressError(400, "Description is missing!");
  // }
  // if(!newListing.location){
  //   throw new ExpressError(400, "Location is missing!");
  // }

  await newListing.save();
  req.flash("success", "New listing created!");
  res.redirect("/listings");
};

export const renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you request for does not exist!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_400");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

export const updateListing = async (req, res) => {
  // if (!req.body.listing) {
  //   throw new ExpressError(400, "Send valid data for listing");
  // }
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
};

export const destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted successfully!");
  console.log(deletedListing);
  res.redirect("/listings");
};
