Fancy.Class('Fancy.PluginManager', {
	singleton: true,
	constructor: function(){
		var me = this;
		me.ptypes = new Fancy.Data();
	},
	addPlugin: function(ptype, plugin){
		this.ptypes.add(ptype, plugin);
	},
	getPlugin: function(ptype){
		return this.ptypes.get(ptype);		
	}
});

Fancy.addPluginByType = function(ptype, plugin){
	Fancy.PluginManager.addPlugin(ptype, plugin);
};

Fancy.getPluginByType = function(ptype){
	return Fancy.PluginManager.getPlugin(ptype);
};