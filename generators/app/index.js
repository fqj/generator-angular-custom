'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var git = require('nodegit');
require('run-async');

var angularBasicRepoUrl = 'https://github.com/serenity-frontstack/angular-basic.git';

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ' + chalk.red('angular-custom') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'AppName',
        message: 'Your project name',
        default: this.appname // Default to current folder name
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    // Clone angular-basic repo
    this.log('Cloning angular-basic repo');

    var done = this.async();
    git.Clone(angularBasicRepoUrl, './')
    .then(function() {
      done();
    })
    .catch(function(err) { 
      console.log(err) 
    });

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('./src/index.html'), 
      { AppName: this.props.AppName }
    );
  },

  install: function () {
    this.installDependencies({bower: true, npm: true});
  }
});
