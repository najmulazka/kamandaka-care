module.exports = {
  notFoundHandler: (req, res) => {
    res.status(404).json({
      error: {
        status: false,
        message: 'Resource not found',
      },
    });
  },

  internalErrorHandler: (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      error: {
        status: false,
        message,
      },
    });
  },
};
