const errorMiddleware = (err, req, res, next) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  const response = {
    success: false,
    message: err.message,
  };

  return res.status(err.statusCode).json(response);
};

export default errorMiddleware;
