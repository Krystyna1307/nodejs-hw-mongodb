export const errorHandler = (error, req, res, next) => {
  // 4 express викливає цю функцію
  const { status = 500, message } = error;
  res.status(status).json({
    status,
    message,
  });
};
