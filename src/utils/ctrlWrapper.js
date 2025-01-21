export const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };
  return func;
};
