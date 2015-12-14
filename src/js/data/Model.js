Fancy.Class('Fancy.Model', {
  constructor: function(data){
    var me = this;

    if( Fancy.isArray(data) ){
      var row = {},
        fields = me.fields,
        j = 0,
        jL = fields.length;

      for(;j<jL;j++){
        var p = fields[j];
        row[p] = data[j];
      }

      me.data = row;
    }
    else{
      if( me.fields === undefined ){
        var fields = [];
        for(var p in data){
          fields.push(p)
        }
        me.fields = fields;
      }

      var row = {},
        fields = me.fields,
        j = 0,
        jL = fields.length;

      for(;j<jL;j++){
        var p = fields[j];
        row[p] = data[p];
      }

      me.data = row;
    }
    },
  get: function(key){
    var me = this;

    return me.data[key];
  },
  set: function(key, value){
    var me = this;

    me.data[key] = value;
  }
});