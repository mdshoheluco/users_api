import express from "express";
import {
  GET_ALL_USERS,
  CREATE_USER,
  GET_SINGLE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_USERS_BY_RADIUS,
} from "../controllers/Users.js";

const router = express.Router();

router.route("/radius/:zipcode/:distance").get(GET_USERS_BY_RADIUS);

router.route("/").get(GET_ALL_USERS).post(CREATE_USER);
router
  .route("/:userId")
  .get(GET_SINGLE_USER)
  .patch(UPDATE_USER)
  .delete(DELETE_USER);

export default router;
