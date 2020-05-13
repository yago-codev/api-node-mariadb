const User = require("../../models").User;
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const successResponse = require("../responses/success.response");
const invalidResponse = require("../responses/invalid.response");
const errorResponse = require("../responses/error.response");

class UsersController {
  async index(req, res, next) {
    try {
      const { entities, meta } = await User.search(req.query);

      return successResponse(res, 200, null, entities, meta);
    } catch (error) {
      return errorResponse(
        res,
        500,
        "Não foi possível listar entidades de Usuários",
        error
      );
    }
  }
  async show(req, res, next) {
    try {
      const entity = await User.get(req.params.id);

      return successResponse(res, 200, null, entity, null);
    } catch (error) {
      return errorResponse(
        res,
        500,
        "Não foi possível recuperar os dados da entidade de Usuários pelo Id",
        error
      );
    }
  }
  async create(req, res, next) {
    try {
      const entity = await User.create(req.body);

      return successResponse(
        res,
        200,
        "Nova entidade criada com sucesso em Usuários",
        entity,
        null
      );
    } catch (error) {
      if (error.name && errror.name.includes("SequelizeValidation")) {
        return invalidResponse(
          res,
          400,
          "Dados informados não são válidos",
          error
        );
      }

      return errorResponse(
        res,
        500,
        "Erro ao tentar incluir entidade em Usuários",
        error
      );
    }
  }
  async update(req, res, next) {
    try {
      const entityOld = await User.get(req.params.id);

      const entityNew = await entityOld.update(req.body);

      return successResponse(
        res,
        200,
        "Entidade atualizada com sucesso em Usuários",
        entityNew,
        null
      );
    } catch (error) {
      if (error.name && error.name.includes("SequelizeValidation")) {
        return errorResponse(
          res,
          404,
          "Dados informados não são válidos",
          error
        );
      }

      return errorResponse(
        res,
        500,
        "Erro ao atualizar entidade em Usuários",
        error
      );
    }
  }
  async remove(req, res, next) {
    try {
      const entity = await User.get(req.params.id);

      if (!entity) {
        return invalidResponse(
          res,
          404,
          "Não foi possível recuperar os dados da entidade de Usuários pelo Id",
          error
        );
      }

      entity.destroy();

      return successResponse(
        res,
        204,
        "Entidade excluída com sucesso em Usuários",
        entity,
        null
      );
    } catch (error) {
      return errorResponse(
        res,
        500,
        "Erro ao tentar deletar entidade em Usuários",
        error
      );
    }
  }
}

module.exports = new UsersController();
