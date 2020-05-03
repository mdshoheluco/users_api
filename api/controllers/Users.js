import User from "../models/Users.js";
import ErrorResponse from "../../utils/errorResponse.js";
import asyncHandler from "../middlewares/async.js";
import geocoder from "../../utils/geocoder.js";

export const GET_ALL_USERS = asyncHandler(async (req, res, next) => {
  let users;
  if (req.query.company) {
    const { company } = req.query;
    users = await User.find({ company });
  } else {
    users = await User.find();
  }
  res.status(200).json({
    success: true,
    count: users.length,
    users: users,
  });
});

export const GET_SINGLE_USER = asyncHandler(async (req, res, next) => {
  const id = req.params.userId;
  const user = await User.findById(id);
  if (user) {
    res.status(200).json({
      success: true,
      user,
    });
  } else {
    return next(
      new ErrorResponse(
        `User not found with the id of ${req.params.userId}`,
        404
      )
    );
  }
});

export const CREATE_USER = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    user: user,
  });
});

export const UPDATE_USER = asyncHandler(async (req, res, next) => {
  const user = await User.update({ _id: req.params.userId }, req.body);
  res.status(200).json({
    success: true,
    user,
  });
});

export const DELETE_USER = asyncHandler(async (req, res, next) => {
  const id = req.params.userId;
  await User.deleteOne({ _id: id });
  res.status(200).json({
    success: true,
    message: `Successfully deleted`,
  });
});

export const GET_USERS_BY_RADIUS = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  const loc = await geocoder.geocode(zipcode);
  const lng = loc[0].longitude;
  const ltd = loc[0].latitude;

  const radius = distance / 3963;

  const users = await User.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, ltd], radius] },
    },
  });

  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});
