import ErrorResponse from "../../utils/errorResponse.js";

const errorHandler = (err, req, res, next) => {
  const error = { ...err };
  error.message = err.message;

  if (err.name === "CastError") {
    const errorCheck = new ErrorResponse(
      `User not found with the id of ${err.value}`,
      404
    );
    return res.status(errorCheck.statusCode).json({
      success: false,
      message: errorCheck.message,
    });
  }

  if (err.name === "ValidationError") {
    const errors = Object.values(error.errors).map((value) => value.message);
    const messages = new ErrorResponse(errors, 404);
    const { statusCode, message } = messages;
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message,
  });
};

export default errorHandler;
