import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}
if (!process.env.CLOUDE_NAME) {
  throw new Error("CLOUDE_NAME is not defined in environment variables");
}
if (!process.env.CLOUD_API_KEY) {
  throw new Error("CLOUD_API_KEY is not defined in environment variables");
}
if (!process.env.CLOUD_API_SECRET) {
  throw new Error("CLOUD_API_SECRET is not defined in environment variables");
}
if (!process.env.MAP_TOKEN) {
  throw new Error("MAP_TOKEN is not defined in environment variables");
}
if (!process.env.SECRET) {
  throw new Error("SECRET is not defined in environment variables");
}

const config = {
  MONGO_URI: process.env.MONGO_URI,
  CLOUDE_NAME: process.env.CLOUDE_NAME,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
  MAP_TOKEN: process.env.MAP_TOKEN,
  SECRET: process.env.SECRET,
};

export default config;
