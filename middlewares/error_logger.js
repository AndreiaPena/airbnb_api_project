module.exports = (error, request, response, next) => {
    console.error(`${error.name}\n  ${error.description}`);
    next(error);
  };