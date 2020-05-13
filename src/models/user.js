const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const Op = Sequelize.Op;

class User extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "O nome deve ser informado",
            },
          },
        },
        description: DataTypes.STRING,
        pic: DataTypes.STRING,
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "O email deve ser informado",
            },
            isEmail: {
              // validação nativa do Sequelize
              msg: "Por favorm informe um email válido",
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "A senha deve ser informada",
            },
          },
        },
      },
      {
        sequelize,
        underscored: true,
      }
    );
  }
  static associate(models) {}

  static async search(query) {
    const limit = query.limit ? parseInt(query.limit) : 20;
    const offset = query.offset ? parseInt(query.offset) : 0;

    let where = {};

    if (query.name) {
      where.name = {
        [Op.like]: `%${query.name}%`,
      };
    }

    if (query.email) {
      where.email = query.email;
    }

    const entities = await User.findAndCountAll({
      where: where,
      limit: limit,
      offset: offset,
    });

    return {
      entities: entities.rows,
      meta: {
        count: entities.count,
        limit: limit,
        offset: offset,
      },
    };
  }

  static async get(id) {
    return await User.findByPk(id, {});
  }
}

module.exports = User;
