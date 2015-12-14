Fancy.Class(['Fancy.form.field.String', 'Fancy.StringField'], {
	traits: {
		classes: [
			Fancy.form.field.Trait
		]
	},
	extend: Fancy.Widget,
	type: 'field.string',
	constructor: function(config){
		var me = this,
			config = config || {};
		
		Fancy.apply(me, config);
		
		me.Super('const', arguments);
	},
	init: function(){
		var me = this;
		
		me.addEvents('focus', 'blur', 'input', 'enter', 'up', 'down', 'change', 'key');
		
		me.Super('init', arguments);
		
		me.tpl = new Fancy.Template(me.tpl);
		me.render();
		
		me.ons();
		
		if( me.isPassword ){
			me.input.attr({
				"type": "password"
			});
		}
		
		if( me.hidden ){
			me.el.css('display', 'none');
		}
		
		if( me.style ){
			me.el.css(me.style);
		}
	},
	cls: 'fancy fancy-field',
	value: '',
	width: 100,
	emptyText: '',
	tpl: [
		'<div class="fancy-field-label" style="{labelWidth}{labelDisplay}">',
			'{label}',
		'</div>',
		'<div class="fancy-field-text">',
			'<input placeholder="{emptyText}" class="fancy-field-text-input" style="{inputWidth}" value="{value}">',
			'<div class="fancy-field-error" style="{errorTextStyle}"></div>',
		'</div>',
		'<div class="fancy-clearfix"></div>'
	]
});