const ResourceController = require("./resource.controller");
const User = require("../../models").User;

const successResponse = require("../responses/success.response");
const errorResponse = require("../responses/error.response");

class UsersController extends ResourceController {
  constructor() {
    super();
    this.setModel(User);
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await User.verifyLogin(email, password);
      successResponse(res, 200, "Usuário autenticado com sucesso", result);
    } catch (error) {
      errorResponse(
        res,
        500,
        "Não foi possível realizar a autenticação",
        error
      );
    }
  }
}

module.exports = new UsersController();
