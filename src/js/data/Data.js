/*
 * @class Fancy.Data
 */
Fancy.Class('Fancy.Data', {
  /*
   * @constructor
   * @param {Array} data
   */
  constructor: function(data){
    var me = this;

    me.map = {};

    if(data){
      var i = 0,
        iL = data.length,
        map = me.map;

      for(;i<iL;i++){
        map[i] = data[i];
      }
    }

    me.length = 0;
  },
  /*
   * @param {String|Number} key
   * @param {*} value
   */
  add: function(key, value){
    var me = this;

    me.map[key] = value;
    me.length++;
  },
  /*
   * @param {String|Number} key
   * @returns {*}
   */
  get: function(key){
    return this.map[key];
  }
});