const errorResponse = require("../responses/error.response");

module.exports = async (req, res, next) => {
  const userId = parseInt(req.params.id);

  if (userId !== req.body.user.id) {
    return errorResponse(
      res,
      400,
      "Você não tem permissão para acessar esse recurso"
    );
  }

  next();
};
