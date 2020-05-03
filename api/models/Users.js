import mongoose from "mongoose";
import slugify from "slugify";
import geocoder from "../../utils/geocoder.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  slug: String,
  address: {
    type: String,
    required: [true, "Please enter an address"],
  },
  company: {
    type: String,
    required: [true, "Please enter a valid company name"],
    enum: ["Google", "Microsoft", "Amazon"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
    formattedAddess: String,
    street: String,
    city: String,
    zipcode: String,
    state: String,
    country: String,
  },
});

userSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

userSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddess: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    zipcode: loc[0].zipcode,
    state: loc[0].stateCode,
    country: loc[0].countryCode,
  };

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
