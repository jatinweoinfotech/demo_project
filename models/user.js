'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'comments'
    });
    User.addScope('User', {
      include: {
        model: models.Comment, as: 'comments',
        attributes: ['title', 'userId']
      },
      attributes: ['firstName', 'lastName', 'email']
    })
  };
  return User;
};