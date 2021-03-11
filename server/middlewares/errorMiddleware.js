export const errorHandler = (err, req, res, next) => {
  const statusCode = res.StatusCode === 200 ? 500 : res.StatusCode;
  res.statusCode(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" && err.stack,
  });
};
