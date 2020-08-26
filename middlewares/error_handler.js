module.exports = (error, request, response, next) => {
    const { title, description } = error;
    response.status(error.status).json({
      title,
      description
    });
  };