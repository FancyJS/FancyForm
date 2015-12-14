/**
 * @class Fancy.Widget
 * @extends Fancy.Event
 */
Fancy.Class('Fancy.Widget', {
	extend: Fancy.Event,
	constructor: function(config){
		var me = this;
		
		Fancy.applyConfig(me, config);
		
		me.Super('const', arguments);
		
		me.init();
	},
	init: function(){
		var me = this;
		
		me.initId();
		me.addEvents('beforerender', 'afterrender', 'render', 'show', 'hide', 'destroy');
		me.initPlugins();
	},
	renderItems: function(renderTo){
		var me = this,
			i = 0,
			iL = me.items.length;
		
		for(;i<iL;i++){
			var item = me.items[i],
				w = Fancy.getClassByType(item.type);
			
			item.renderTo = renderTo;
			me.items[i] = new w(item);
		}
	}
});