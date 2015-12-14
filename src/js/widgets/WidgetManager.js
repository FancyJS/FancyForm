Fancy.Class('Fancy.WidgetManager', {
  singleton: true,
  constructor: function(){
    var me = this;

    me.wtypes = new Fancy.Data();
    me.widgets = new Fancy.Data();
  },
  addWidgetType: function(wtype, widget){
    widget.prototype.wtype = wtype;
    this.wtypes.add(wtype, widget);
  },
  getWidgetClassByType: function(wtype){
    return this.wtypes.get(wtype);
  },
  addWidget: function(id, widget){
    this.widgets.add(id, widget);
  },
  getWidget: function(id){
    return this.widgets.get(id);
  }
});

Fancy.addWidgetType = function(wtype, widget){
  Fancy.WidgetManager.addWidgetType(wtype, widget);
};

Fancy.getWidgetClassByType = function(wtype){
  return Fancy.WidgetManager.getWidgetClassByType(wtype);
};

Fancy.addWidget = function(id, widget){
  Fancy.WidgetManager.addWidget(id, widget);
};

Fancy.getWidget = function(id){
  return Fancy.WidgetManager.getWidget(id);
};