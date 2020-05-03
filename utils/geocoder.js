import NodeGeocoder from "node-geocoder";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const options = {
  provider: "mapquest",
  apiKey: "YLIGWWpaSdHOn2om2m2v1CCunhKlSXmH",
  formatter: false,
};

const geocoder = NodeGeocoder(options);

export default geocoder;
