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
}

module.exports = User;
