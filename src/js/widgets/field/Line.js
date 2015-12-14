Fancy.Class(['Fancy.form.field.Line', 'Fancy.FieldLine'], {
	traits: {
		classes: [
			Fancy.form.field.Trait
		]
	},
	extend: Fancy.Widget,
	type: 'field.line',
	constructor: function(config){
		var me = this,
			config = config || {};
		
		Fancy.apply(me, config);
		
		me.Super('const', arguments);
	},
	init: function(){
		var me = this;
		
		me.addEvents();
		
		me.Super('init', arguments);
		
		me.tpl = new Fancy.Template(me.tpl);
		
		var i = 0,
			iL = me.items.length,
			isItemTop;
		
		for(;i<iL;i++){
			var item = me.items[i];
			
			item.style = item.style || {};
			
			if( item.labelAlign === 'top' ){
				isItemTop = true;
				//break;
			}
			else{
				item.style['padding-top'] = '0px'
			}
			
			if( i === 0 ){
				item.style['padding-left'] = '0px';
			}
		}
		
		me.render();
		
		if( isItemTop ){
			me.el.css('height', '48px');
		}
	},
	cls: 'fancy fancy-field fancy-field-line',
	value: '',
	width: 100,
	emptyText: '',
	tpl: [
		'<div class="fancy-field-text fancy-field-line-items">',
		'</div>'
	]
});