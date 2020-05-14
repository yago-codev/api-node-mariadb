const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");

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
        hooks: {
          beforeSave: (user, options) => {
            user.password = bcrypt.hashSync(user.password, 10);
          },
        },
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

  static async verifyLogin(email, password) {
    try {
      let user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new Error("Email não encontrado");
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new Error("Senha inválida");
      }

      let token = jwt.sign(
        {
          id: user.id,
        },
        process.env.SECRET,
        {
          expiresIn: "1d",
        }
      );

      return {
        user: user.transform(),
        token: token,
      };
    } catch (error) {
      throw error;
    }
  }

  transform() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      description: this.description,
      pic: this.pic,
    };
  }
}

module.exports = User;
