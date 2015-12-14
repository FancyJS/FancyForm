Fancy.Class(['Fancy.form.field.HTML', 'Fancy.HTMLField'], {
	traits: {
		classes: [
			Fancy.form.field.Trait
		]
	},
	extend: Fancy.Widget,
	type: 'field.html',
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
		
		//me.ons();
		
		if( me.hidden ){
			me.el.css('display', 'none');
		}
		
		if( me.style ){
			me.el.css(me.style);
		}
	},
	cls: 'fancy fancy-field-html',
	value: '',
	width: 100,
	emptyText: '',
	tpl: [
		'<div class="" style="">',
			'{value}',
		'</div>'
	],
	render: function(){
		var me = this,
			renderTo = me.renderTo || document.body,
			el = document.createElement('div');
		
		me.prepareValid();
		
		me.fire('beforerender');
		el.className = me.cls;
		
		el.innerHTML = me.tpl.getHTML({
			value: me.value,
			height: me.height
		});
		
		me.el = renderTo.appendChild(el);
		me.el = Fancy.get(me.el);
		
		me.acceptedValue = me.value;
		me.fire('afterrender');
		me.fire('render');
	}
});