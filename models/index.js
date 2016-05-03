var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = sequelize.define('page', {
  title: Sequelize.STRING,
  urlTitle: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  content: Sequelize.TEXT,
  date: Sequelize.DATE,
  status: Sequelize.ENUM('open', 'closed')
});

var User = sequelize.define('user', {
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
});

module.exports = {
  Page: Page,
  User: User
};