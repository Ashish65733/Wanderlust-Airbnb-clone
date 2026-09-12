if (process.env.NODE_ENV !== "production") {
  import("dotenv").then((dotenv) => {
    dotenv.config();
  });
}
import mongoose from "mongoose";
import initData from "./dataWithCateg.js";
import Listing from "../models/listing.model.js";
import axios from "axios";
import config from "../config/config.js";

async function connectDB() {
  await mongoose.connect(config.MONGO_URI);
  console.log("Connected to DB");
}

connectDB();

const initDB = async () => {
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "69f36a75e1eedfb95cbbf891",
  }));

  for (let listing of initData.data) {
    // Geocode the location using MapTiler API
    try {
      const geoRes = await axios.get(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(listing.location + ", " + listing.country)}.json?key=${config.MAP_TOKEN}`,
      );

      const coords = geoRes.data.features[0]?.geometry?.coordinates || [
        72.969818, 23.597969,
      ];

      listing.geometry = {
        type: "Point",
        coordinates: coords,
      };
    } catch (err) {
      console.log(`Failed to geocode ${listing.title}:`, err.message);
      listing.geometry = {
        type: "Point",
        coordinates: [72.969818, 23.597969], // Default coordinates
      };
    }
  }

  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
