Fancy.Class(['Fancy.form.field.Set', 'Fancy.SetField'], {
	traits: {
		classes: [
			Fancy.form.field.Trait
		]
	},
	extend: Fancy.Widget,
	type: 'field.set',
	constructor: function(config){
		var me = this,
			config = config || {};
		
		Fancy.apply(me, config);
		
		me.Super('const', arguments);
	},
	init: function(){
		var me = this;
		
		me.addEvents('collapsed', 'expanded');
		
		me.Super('init', arguments);
		
		me.tpl = new Fancy.Template(me.tpl);
		
		var i = 0,
			iL = me.items.length,
			isItemTop;
		
		for(;i<iL;i++){
			var item = me.items[i];
			
			if( item.labelAlign === 'top' ){
				isItemTop = true;
				//break;
				if( i === 0 ){
					item.style = {
						'padding-left': '0px'
					};
				}
			}
		}
		
		me.render();
		if( me.checkbox !== undefined ){
			me.initCheckBox();
		}
		
		me.on('collapsed', me.onCollapsed, me);
		me.on('expanded', me.onExpanded, me);
	},
	cls: 'fancy fancy-field-set',
	value: '',
	width: 100,
	emptyText: '',
	tpl: [
		/*
		'<div class="fancy-field-label" style="{labelWidth}{labelDisplay}">',
			'{label}',
		'</div>',
		*/
		'<fieldset>',
			'<legend>',
				//'<div class="fancy-field-set-checkbox" style="float:left;"></div>',
				'<div class="fancy-field-checkbox-input" style="float:left;margin-top: 4px;display: none;"></div>',
				'<div class="fancy-field-set-label" style="float:left;">{label}</div>',
				'<div class="fancy-clearfix"></div>',
			'</legend>',
			'<div class="fancy-field-text fancy-field-set-items">',
			
			'</div>',
		'</fieldset>'
		//'<div class="fancy-clearfix"></div>'
	],
	initCheckBox: function(){
		var me = this,
			checkbox = Fancy.get(me.el.select('.fancy-field-checkbox-input')[0]);
		
		checkbox.css('display', '');
		
		if( me.checkbox === true ){
			me.el.addClass('fancy-checkbox-on');
		}
		
		var itemsEl = me.el.select('.fancy-field-set-items');
		
		setTimeout(function(){
			if( me.checkbox === true ){}
			else{
				me.fire('collapsed');
			}
		}, 1);
		
		if( me.checkbox === true ){
			itemsEl.css('display', '');
			me.el.removeClass('fancy-set-collapsed');
		}
		else{
			itemsEl.css('display', 'none');
			me.el.addClass('fancy-set-collapsed');
		}
		
		checkbox.on('click', function(){
			me.el.toggleClass('fancy-checkbox-on');
			
			var isChecked = me.el.hasClass('fancy-checkbox-on'),
				itemsEl = me.el.select('.fancy-field-set-items');
			
			if( isChecked ){
				itemsEl.css('display', '');
				me.el.removeClass('fancy-set-collapsed');
				me.fire('expanded');
			}
			else{
				itemsEl.css('display', 'none');
				me.el.addClass('fancy-set-collapsed');
				me.fire('collapsed');
			}
		});
		
	},
	onCollapsed: function(){
		var me = this,
			form = me.form,
			itemsEl = me.el.select('.fancy-field-set-items'),
			itemsHeight = parseInt(itemsEl.css('height'));
		
		form.setHeight(form.getHeight() - itemsHeight);
	},
	onExpanded: function(){
		var me = this,
			form = me.form,
			itemsEl = me.el.select('.fancy-field-set-items'),
			itemsHeight = parseInt(itemsEl.css('height'));
		
		form.setHeight(form.getHeight() + itemsHeight);
	}
});