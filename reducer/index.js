'use strict';
var yeoman = require('yeoman-generator');
var generators = yeoman.generators;
var _ = require('lodash');

var HandlerGenerator = generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('name', {
      required: true,
      type: String,
      desc: 'The Actions name',
    });

    this.argument('actions', {
      required: true,
      type: Array,
      desc: 'The actions',
    });

    // Next, add your custom code
    this.option('parent'); // This method adds support for a `--parent` flag
  },

  writing: function() {

    let toConst = function(action) {
      return _.toUpper(_.snakeCase(action));
    };

    let toFunc = function(action) {
      return _.camelCase(action);
    };

    this.fs.copyTpl(
      this.templatePath('reducer.js'),
      this.destinationPath(`reducers/${_.upperFirst(this.name)}Reducer.js`),
      { name: this.name, actionFile: `${_.upperFirst(this.name)}Actions`,
        actions: this.actions, toConst: toConst, toFunc: toFunc, }
    );
  },
});

module.exports = HandlerGenerator;
