const catchAsync = (handler) => {
  return async (req, res, next) => {
    try {
      await hadnler(req, res);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = catchAsync;
