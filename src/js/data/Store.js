Fancy.Class('Fancy.Store', {
	extend: Fancy.Event,
	constructor: function(config){
		var me = this,
			config = config || {};
		
		Fancy.applyConfig(me, config);
		
		me.Super('const', arguments);
		
		me.init();
		
		me.data = [];
		me.setModel();
		if(config.data){
			me.setData(config.data);
			delete config.data;
		}
		
		//me.Super('const', arguments);
		me.init();
    },
	init: function(){
		var me = this;
		
		me.addEvents('add');
		me.initId();
		me.initPlugins();
	},
	setModel: function(){
		var me = this,
			model = me.model;
		
		if(model === undefined){
			model = Fancy.Model;
		}
		else{
			model = Fancy.ClassManager.get(me.model);
		}
		
		me.model = model;
		me.fields = model.prototype.fields;
		if( me.fields === undefined){
			throw new Error('needed to set fields in Model of Store');
		}
	},
	setData: function(data){
		var me = this,
			i = 0,
			iL = data.length,
			model = me.model;
		
		if( Fancy.isObject(data[0]) ){
			for(;i<iL;i++){
				me.data[i] = new model(data[i]);
			}
		}
		else{
			for(;i<iL;i++){
				me.data[i] = new model(data[i]);
			}
		}
	},
	add: function(o){
		var me = this;
		
		me.data.push(o);
		me.fire('add', o);
	}
});