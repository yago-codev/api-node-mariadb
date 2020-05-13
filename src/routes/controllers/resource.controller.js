const successResponse = require("../responses/success.response");
const invalidResponse = require("../responses/invalid.response");
const errorResponse = require("../responses/error.response");

class ResourceController {
  constructor() {
    this.model = null;
  }

  setModel(model) {
    this.model = model;
  }

  bindMethod(method) {
    return this[method].bind(this);
  }

  async index(req, res, next) {
    try {
      const { entities, meta } = await this.model.search(req.query);

      return successResponse(res, 200, null, entities, meta);
    } catch (error) {
      return errorResponse(
        res,
        500,
        `Não foi possível listar entidades de ${this.model.getTableName()}`,
        error
      );
    }
  }
  async show(req, res, next) {
    try {
      const entity = await this.model.get(req.params.id);

      return successResponse(res, 200, null, entity, null);
    } catch (error) {
      return errorResponse(
        res,
        500,
        `Não foi possível recuperar os dados da entidade de ${this.model.getTableName()} pelo Id`,
        error
      );
    }
  }
  async create(req, res, next) {
    try {
      const entity = await this.model.create(req.body);

      return successResponse(
        res,
        200,
        `Nova entidade criada com sucesso em ${this.model.getTableName()}`,
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
        `Erro ao tentar incluir entidade em ${this.model.getTableName()}`,
        error
      );
    }
  }
  async update(req, res, next) {
    try {
      const entityOld = await this.model.get(req.params.id);

      const entityNew = await entityOld.update(req.body);

      return successResponse(
        res,
        200,
        `Entidade atualizada com sucesso em ${this.model.getTableName()}`,
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
        `Erro ao atualizar entidade em ${this.model.getTableName()}`,
        error
      );
    }
  }
  async remove(req, res, next) {
    try {
      const entity = await this.model.get(req.params.id);

      if (!entity) {
        return invalidResponse(
          res,
          404,
          `Não foi possível recuperar os dados da entidade de ${this.model.getTableName()} pelo Id`,
          error
        );
      }

      entity.destroy();

      return successResponse(
        res,
        204,
        `Entidade excluída com sucesso em ${this.model.getTableName()}`,
        entity,
        null
      );
    } catch (error) {
      return errorResponse(
        res,
        500,
        `Erro ao tentar deletar entidade em ${this.model.getTableName()}`,
        error
      );
    }
  }
}

module.exports = ResourceController;
