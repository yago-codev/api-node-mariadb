const User = require("../../models").User;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class UsersController {
  async index(req, res, next) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 20;
      const offset = req.query.offset ? parseInt(req.query.offset) : 0;

      let where = {};

      if (req.query.name) {
        where.name = {
          [Op.like]: `%${req.query.name}%`,
        };
      }

      if (req.query.email) {
        where.email = req.query.email;
      }

      const entities = await User.findAndCountAll({
        where: where,
        limit: limit,
        offset: offset,
      });

      return res.status(200).json({
        status: "SUCCESS",
        data: entities,
        meta: {
          limit: limit,
          offset: offset,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERROR",
        message: "Não foi possível listar entidades de Usuários",
      });
    }
  }
  async show(req, res, next) {
    try {
      const entity = await User.findByPk(req.param.id);

      return res.status(200).json({
        status: "SUCCESS",
        message: entity,
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERROR",
        message:
          "Não foi possível recuperar os dados da entidade de Usuários pelo Id",
      });
    }
  }
  async store(req, res, next) {
    try {
      const entity = await User.create(req.body);

      return res.status(200).json({
        status: "SUCCESS",
        message: "Nova entidade criada com sucesso em Usuários",
        data: entity,
      });
    } catch (error) {
      if (error.name && errror.name.includes("SequelizeValidation")) {
        return res.status(404).json({
          status: "INVALID",
          message: "Dados informados não são válidos",
          error: error.errors.map((err) => {
            return {
              message: err.message,
              field: err.path,
              value: err.value,
            };
          }),
        });
      }

      return res.status(500).json({
        status: "ERROR",
        message: "Erro ao tentar incluir entidade em Usuários",
      });
    }
  }
  async update(req, res, next) {
    try {
      const entityOld = await User.findByPk(req.param.id);

      const entityNew = await entityOld.update(req.body);

      return res.status(200).json({
        status: "SUCCESS",
        message: "Entidade atualizada com sucesso em Usuários",
        data: entityNew,
      });
    } catch (error) {
      if (error.name && error.name.includes("SequelizeValidation")) {
        return res.status(404).json({
          status: "INVALID",
          message: "Dados informados não são válidos",
          error: error.erros.map((err) => {
            return {
              message: err.message,
              field: err.path,
              value: err.value,
            };
          }),
        });
      }

      return res.status(500).json({
        status: "ERROR",
        message: "Erro ao atualizar entidade em Usuários",
      });
    }
  }
  async remove(req, res, next) {
    try {
      const entity = await User.findByPk(req.param.id);

      if (!entity) {
        return res.status(404).json({
          status: "INVALID",
          message:
            "Não foi possível recuperar os dados da entidade de Usuários pelo Id",
        });
      }

      return res.status(204).json({
        status: "SUCCESS",
        data: "Entidade excluída com sucesso em Usuários",
      });
    } catch (error) {
      return res.status(500).json({
        status: "ERROR",
        message: "",
      });
    }
  }
}

module.exports = new UsersController();
