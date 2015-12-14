Fancy.TraitClass = function(){};

Fancy.TraitClass.prototype = {
  /**
   * generate unique id for class
   */
	initId: function(){
		var me = this,
			prefix = me.prefix || Fancy.prefix;
		
		me.id = me.id || Fancy.id(null, prefix);
		
		Fancy.addWidget(me.id, me);
	},
  /*
   * Initialize plugins if they are presented in class
   */
	initPlugins: function(){
		var me = this,
			widget = me,
			plugin,
			objectPlugin,
			pluginConfig;
		
		if(me.plugins !== undefined){
			me.$plugins = me.plugins;
			delete me.plugins;
		}
		
		if(me.$plugins === undefined){
			return;
		}
		
		var i = 0,
			plugins = me.$plugins,
			iL = plugins.length,
			inWidgetName;

		for(;i<iL;i++){
			pluginConfig = plugins[i];
			pluginConfig.widget = widget;
			
			var type = pluginConfig.type || pluginConfig.ptype;
			plugin = Fancy.getPluginByType( type );
			objectPlugin = new plugin(pluginConfig);
			inWidgetName = pluginConfig.inWidgetName || objectPlugin.inWidgetName;
			
			if(inWidgetName !== undefined){
				widget[ inWidgetName ] = objectPlugin;
			}
		}
	}
};