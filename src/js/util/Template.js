/**
 * @class Fancy.Template
 * @constructor
 * @param {Array} html
 */
Fancy.Template = function(html){
  var me = this;

  me.tpl = html.join('');
  me.compile();
};

Fancy.Template.prototype = {
  re: /\{([\w\-]+)\}/g,
  /*
   * @param {Array} values
   */
  getHTML: function(values){
    var me = this;

    return me.compiled(values);
  },
  /*
   * @returns {Fancy.Template}
   */
  compile: function(){
    var me = this,
      sep = "+";

      function fn(m, name){
        name = "values['" + name + "']";
        return "'+(" + name + " === undefined ? '' : " + name + ")+'";
      }

    eval("me.compiled = function(values){ return '" + me.tpl.replace(me.re, fn) + "';};");
    return me;
  }
};