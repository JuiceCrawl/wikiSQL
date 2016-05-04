'use strict';

var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});

var Page = db.define('page', {
  title: {
    type: Sequelize.STRING, 
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  date: {
    type:Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  status: {
    type:Sequelize.ENUM('open', 'closed'),
    defaultValue: 'open'
    }
  },
  {
  getterMethods: {
    route: function(){
      return '/wiki/' + this.getDataValue('urlTitle');
    }
  },
  // setterMethods: {
  //   urlTitle: function(){
  //     var title = this.getDataValue('title');
  //     //return this.setDataValue('urlTitle', title.toString().toLowerCase().replace(/\s/g, "_").replace(/\W/g, ""));
  //     return this.setDataValue('urlTitle', this.hooks.beforeValidate[0](title));
  //   }
  // },
  hooks:{
    beforeValidate:[
      function generateUrlTitle (page) {
        if (page.title) {
          // Removes all non-alphanumeric characters from title
          // And make whitespace underscore
          page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '').toLowerCase();
        } else {
          // Generates random 5 letter string
          page.urlTitle = Math.random().toString(36).substring(2, 7);
          // page.title = page.urlTitle;
        }
      }
    ]
  }

});

var User = db.define('user', {
  name: {
    type:Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
  Page: Page,
  User: User
};