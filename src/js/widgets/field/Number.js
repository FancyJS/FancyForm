Fancy.Class(['Fancy.form.field.Number', 'Fancy.NumberField'], {
	traits: {
		classes: [
			Fancy.form.field.Trait
		]
	},
	extend: Fancy.Widget,
	type: 'field.number',
	allowBlank: true,
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
	step: 1,
	max: 100000000000000000000,
	min: -100000000000000000000,
	tpl: [
		'<div class="fancy-field-label" style="{labelWidth}{labelDisplay}">',
			'{label}',
		'</div>',
		'<div class="fancy-field-text">',
			'<input placeholder="{emptyText}" class="fancy-field-text-input" style="{inputWidth}" value="{value}">',
			'<div class="fancy-field-error" style="{errorTextStyle}"></div>',
		'</div>',
		'<div class="fancy-clearfix"></div>'
	],
	onInput: function(){
		var me = this,
			input = me.input,
			value = me.get(),
			isValid = me.checkMinMax(value);
		
		if( me.isNumber(value) === false || value === '-' || value === '+' ){
			//input.dom.value = me.acceptedValue;
			//input.dom.value = value;
			isValid = false;
			//return;
		}
		
		if(isValid === false){
			/*
			if( value <= me.min ){
				value = me.min;
			}
			else{
				value = me.max;
			}
			*/
			//input.dom.value = value;
			//me.el.addClass('fancy-field-not-valid');
		}
		
		if( value === '' && me.allowBlank ){
			isValid = true;
		}
		else if(value === '' && me.allowBlank === false){
			isValid = false;
			me.el.addClass('fancy-field-not-valid');
		}
		
		if(value === '' || value === '-'){}
		else{
			//me.set( Number(value), false );
		}
		
		if( isValid ){
			me.acceptedValue = me.get();
			me.el.removeClass('fancy-field-not-valid');
		}
		me.fire('input', value);
		me.fire('change', value);
	},
	isNumber: function(value){
		var me = this;
		if(value === '' || value === '-'){
			return true;
		}
		
		return Fancy.isNumber(+value);
	},
	checkMinMax: function(value){
		if(value === '' || value === '-'){
			return true;
		}
		
		var me = this,
			value = +value;
		
		return value >= me.min && value <= me.max;
	}
});