export const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error); // 3 помилку ловить і передає в next і 4 express викликає функцію
    }
  };
  return func;
};
