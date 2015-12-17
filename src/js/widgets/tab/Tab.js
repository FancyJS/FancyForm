/**
 * @class Fancy.toolbar.Tab
 * @extends Fancy.Button
 */
Fancy.Class('Fancy.toolbar.Tab', {
  extend: Fancy.Button,
  constructor: function(config, scope){
    var me = this;

    me.scope = scope;

    me.Super('const', arguments);
  },
  init: function(){
    var me = this;
  
    me.Super('init', arguments);
  },
  cls: 'fancy fancy-button fancy-toolbar-tab',
  render: function(){
    var me = this;

    me.Super('render', arguments);
  }
});