/*!
 * Fancy Form is JavaScript form library on JQuery
 * Commercial Licence JUST 1$
 */

/**
 * @class Fancy utilities and functions.
 * @singleton
 */
var Fancy = {
  global: this,
  /**
   * The version of the framework
   * @type String
   */
  version: '0.2.6'
};

/**
 * Copies all the properties of `from` to the specified `to`.
 * 
 * @param {Object} to The receiver of the properties.
 * @param {Object} from The primary source of the properties.
 */
Fancy.apply = function(to, from){
  for(var p in from){
    to[p] = from[p];
  }
};

/**
 * Copies all the properties of `from` to the specified `to`.
 * 
 * @param {Object} to The receiver of the properties.
 * @param {Object} from The primary source of the properties.
 */
Fancy.applyIf = function(to, from){
  for(var p in from){
    if( to[p] === undefined ){
      to[p] = from[p];
    }
  }
};

/**
 * Creates namespaces to be used for scoping variables and classes so that they are not global.
 * Specifying the last node of a namespace implicitly creates all other nodes.
 * @param {String} namespace1
 * @param {String} namespace2
 * @param {String} etc
 */
Fancy.namespace = function(){
  var i = 0,
    iL = arguments.length;
  
  for(;i<iL;i++){
    var value = arguments[i],
      parts = value.split("."),
      j = 1,
      jL = parts.length;
    
    Fancy.global[parts[0]] = Fancy.global[parts[0]] || {};
    var namespace = Fancy.global[parts[0]];
    
    for(;j<jL;j++){
      namespace[parts[j]] = namespace[parts[j]] || {};
      namespace = namespace[parts[j]];
    }
  }
};

/**
 * Creates namespaces to be used for scoping variables and classes so that they are not global.
 * Specifying the last node of a namespace implicitly creates all other nodes. 
 * @param {String} namespace1
 * @param {String} namespace2
 * @param {String} etc
 */
Fancy.ns = Fancy.namespace;

/**
 * Returns the type of the given variable in string format. List of possible values are:
 *
 * - `undefined`: If the given value is `undefined`
 * - `string`: If the given value is a string
 * - `number`: If the given value is a number
 * - `boolean`: If the given value is a boolean value
 * - `date`: If the given value is a `Date` object
 * - `function`: If the given value is a function reference
 * - `object`: If the given value is an object
 * - `array`: If the given value is an array
 * - `regexp`: If the given value is a regular expression
 *
 * @param {*} value
 * @return {String}
 */
Fancy.typeOf = function(value){
  if(value === null) {
    return 'null';
  }

  var type = typeof value;
  if(type === 'undefined' || type === 'string' || type === 'number' || type === 'boolean') {
    return type;
  }

  var toString = Object.prototype.toString,
    typeToString = toString.call(value);

  switch(typeToString){
    case '[object Array]':
      return 'array';
    case '[object Date]':
      return 'date';
    case '[object Boolean]':
      return 'boolean';
    case '[object Number]':
      return 'number';
    case '[object RegExp]':
      return 'regexp';
  }

  if(type === 'function'){
    return 'function';
  }

  if(type === 'object'){
    return 'object';
  }
};

/**
 * Returns true if the passed value is a JavaScript array, otherwise false.
 * @param {*} value The value to test
 * @return {Boolean}
 */
Fancy.isArray = ('isArray' in Array) ? Array.isArray : function(value){
  var toString = Object.prototype.toString;
  
  return toString.call(value) === '[object Array]';
};

/**
 * Returns true if the passed value is a JavaScript Object, otherwise false.
 * @param {*} value The value to test
 * @return {Boolean}
 */
Fancy.isObject = function(value){
  var toString = Object.prototype.toString;
  
  return toString.call(value) === '[object Object]';
};

/**
 * Returns true if the passed value is a JavaScript Function, otherwise false.
 * @param {*} value The value to test
 * @return {Boolean}
 */
Fancy.isFunction = function(value){
  var toString = Object.prototype.toString;
  
  return toString.apply(value) === '[object Function]';
};

/**
 * Returns true if the passed value is a string.
 * @param {*} value The value to test
 * @return {Boolean}
 */
Fancy.isString = function(value){
  return typeof value === 'string';
};

/**
 * Returns true if the passed value is a number. Returns false for non-finite numbers.
 * @param {*} value The value to test
 * @return {Boolean}
 */
Fancy.isNumber = function(value){
  return typeof value === 'number' && isFinite(value);
};

/**
 * Returns true if the passed value is a boolean.
 * @param {*} value The value to test
 * @return {Boolean}
 */
Fancy.isBoolean = function(value){
  return typeof value === 'boolean';
};

/**
 * Iterates an array calling the supplied function.
 * @param {Array} arrayObject The array to be iterated. If this
 * argument is not really an array, the supplied function is called once.
 * @param {Function} fn The function to be called with each item.
 * @return See description for the fn parameter.
 */
Fancy.each = function(arrayObject, fn){
  var type = Fancy.typeOf(arrayObject);

  switch(type){
    case 'array':
      var i = 0,
        iL = arrayObject.length;

      for(;i<iL;i++){
        fn(arrayObject[i], i, arrayObject);
      }
      break;
    case 'object':
      for(var p in arrayObject){
        fn(arrayObject[p], p, arrayObject);
      }
      break;
  }
};

/**
 * Helps in OOP for light mixins.
 *
 * @private
 * Iterates an array calling the supplied function.
 * @param {Array} proto The array to be iterated. If this
 * argument is not really an array, the supplied function is called once.
 * @param {Function} traits The function to be called with each item.
 * @return See description for the fn parameter.
 */
Fancy.trait = function(proto, traits){
  if( traits.classes ){
    var i = 0,
      classes = traits.classes,
      iL = classes.length;
    
    if( Fancy.typeOf( traits.classes[0] ) === 'object' ){
      for(;i<iL;i++){
        var item = classes[i],
          _class = item._class,
          methods = item.methods,
          j = 0,
          jL = methods.length;
          
        for(;j<jL;j++){
          var methodName = methods[j];
          proto[methodName] = _class['prototype'][methodName];
        }
      }
    }
    else{
      for(;i<iL;i++){
        Fancy.apply(proto, classes[i]['prototype']);
      }
    }
  }

  if( traits.methods ){
    var i = 0,
      methods = traits.methods,
      iL = methods.length,
      methodObject;
    
    for(;i<iL;i++){
      methodObject = methods[i];
      proto[methodObject.name] = methodObject.method;
    }
  }
};

/**
 * Help function for OOP
 * Help to avoid multiple applying in deep class inheritance
 * Copies all the properties of `config` to the specified `object`.
 * @param {Object} object The receiver of the properties.
 * @param {Object} config The primary source of the properties.
 * @return {Object}
 */
Fancy.applyConfig = function(object, config){
  var property,
    config = config || {};
  
  if(object._isConfigApplied === true){
    return object;
  }
  
  for(property in config){
    object[property] = config[property];
  }
  object._isConfigApplied = true;
  
  return object;
};

Fancy.apply(Fancy, {
  prefix: 'fancy-gen',
  idSeed: 0,
  zIndex: 1,
  id: function(el, prefix){
    if(!el){
      return (prefix || Fancy.prefix) + (++Fancy.idSeed);
    }
    el = el.dom || {};
    if(!el.id){
      el.id = (prefix || Fancy.prefix) + (++Fancy.idSeed);
    }
    return el.id;
  }
});

(function(){

var userAgent = navigator.userAgent.toLowerCase(),
  check = function(regex){
    return regex.test(userAgent);
  },
  isOpera = check(/opera/),
  isIE = !isOpera && check(/msie/);

Fancy.apply(Fancy, {
  isOpera: isOpera,
  isIE: isIE
});

/**
 *
 * @returns {Array}
 */
Fancy.getViewSize = function(){
  var xy = [];
  
  if(Fancy.isIE){
    xy[0] = document.documentElement.clientHeight;
    xy[1] = document.documentElement.clientWidth;
  }
  else{
    xy[0] = window.innerHeight;
    xy[1] = window.innerWidth;
  }
  
  return xy;
};

Fancy.getScroll = function() {
  var dd = document.documentElement,
    db = document.body;

  if (dd && (dd.scrollTop || dd.scrollLeft)) {
    return [dd.scrollTop, dd.scrollLeft];
  } else if (db) {
    return [db.scrollTop, db.scrollLeft];
  } else {
    return [0, 0];
  }
};

})();
/*
 * @class Fancy.Collection
 * @constructor
 */
Fancy.Collection = function(arr){
  var me = this;

  me.items = [];
  me.keys = [];
  me.map = {};
  me.indexMap = {};
  me.length = 0;

  if( arr ){
    if(arr.length > 0){
      var i = 0,
        iL = arr.length;

      for(;i<iL;i++){
        me.add(i, arr[i]);
      }
    }
    else{
      for(var p in arr){
        me.add(p, arr[p]);
      }
    }
  }
};

Fancy.Collection.prototype = {
  /*
   *
   * @param {String|Number} key
   * @param {*} value
   */
  add: function(key, value){
    var me = this;

    me.items.push(value);
    me.keys.push(key);
    me.map[key] = value;
    me.indexMap[key] = me.length;
    me.length++;
  },
  /*
   *
   * @param {String|Number} key
   */
  remove: function(key){
    var me = this,
      index = me.indexMap[key];

    me.items.splice(index, 1);
    me.keys.splice(index, 1);
    delete me.indexMap[index];
    delete me.map[key];
    me.length--;
  },
  removeAll: function(){
    var me = this;

    me.items = [];
    me.keys = [];
    me.indexMap = {};
    me.map = {};
    me.length = 0;
  },
  /*
   *
   * @param {String|Number} key
   * @returns {*}
   */
  get: function(key){
    var me = this;

    return me.map[key];
  },
  /*
   *
   * @param {Function} fn
   */
  each: function(fn){
    var me = this,
      i = 0,
      iL = me.length;

    for(;i<iL;i++){
      fn(me.keys[i], me.items[i], i, me.length);
    }
  }
};
/**
 * @class Fancy.Template
 * @constructor
 * @param {Array} html
 */
Fancy.Template = function(html){
  var me = this;

  me.tpl = html.join('');
  me.compile();
};

Fancy.Template.prototype = {
  re: /\{([\w\-]+)\}/g,
  /*
   * @param {Array} values
   */
  getHTML: function(values){
    var me = this;

    return me.compiled(values);
  },
  /*
   * @returns {Fancy.Template}
   */
  compile: function(){
    var me = this,
      sep = "+";

      function fn(m, name){
        name = "values['" + name + "']";
        return "'+(" + name + " === undefined ? '' : " + name + ")+'";
      }

    eval("me.compiled = function(values){ return '" + me.tpl.replace(me.re, fn) + "';};");
    return me;
  }
};
Fancy.key = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  RETURN: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  ESC: 27,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  INSERT: 45,
  DELETE: 46,
  ZERO: 48,
  ONE: 49,
  TWO: 50,
  THREE: 51,
  FOUR: 52,
  FIVE: 53,
  SIX: 54,
  SEVEN: 55,
  EIGHT: 56,
  NINE: 57,
  NUM_ZERO: 96,
  NUM_ONE: 97,
  NUM_TWO: 98,
  NUM_THREE: 99,
  NUM_FOUR: 100,
  NUM_FIVE: 101,
  NUM_SIX: 102,
  NUM_SEVEN: 103,
  NUM_EIGHT: 104,
  NUM_NINE: 105,
  NUM_PLUS: 107,
    NUM_MINUS: 109,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90
};

Fancy.Key = {
  /*
   * @param {number} c
   * @returns {Boolean}
   */
  isNum: function(c){
    var key = Fancy.key;

    switch(c){
      case key.ZERO:
      case key.ONE:
      case key.TWO:
      case key.THREE:
      case key.FOUR:
      case key.FIVE:
      case key.SIX:
      case key.SEVEN:
      case key.EIGHT:
      case key.NINE:
      case key.NUM_ZERO:
      case key.NUM_ONE:
      case key.NUM_TWO:
      case key.NUM_THREE:
      case key.NUM_FOUR:
      case key.NUM_FIVE:
      case key.NUM_SIX:
      case key.NUM_SEVEN:
      case key.NUM_EIGHT:
      case key.NUM_NINE:
        return true;
      default:
        return false;
    }
  },
  /*
   * @param {Number} c
   * @param {Object} w
   * @returns {Boolean}
   */
  isNumControl: function(c, e){
    var key = Fancy.key;

    if( Fancy.Key.isNum(c) ){
      return true;
    }

    if( e.shiftKey && c === 187){
      return true;
    }

    switch(c){
      case key.NUM_PLUS:
      case 189:
      case key.NUM_MINUS:
      case key.BACKSPACE:
      case key.DELETE:
      case key.TAB:
      case key.ENTER:
      case key.RETURN:
      case key.SHIFT:
      case key.CTRL:
      case key.ALT:
      case key.ESC:
      case key.END:
      case key.HOME:
      case key.LEFT:
      case key.UP:
      case key.RIGHT:
      case key.DOWN:
      case key.INSERT:
        return true;
        break;
      default:
        return false;
    }
  }
};
(function(){

var $classes = {},
  $types = {};

/**
 * Apply method and properties of Parent prototype to Child prototype
 * @private
 * @param {Object} Child
 * @param {Object} Parent
 */
var applyIf = function(Child, Parent){
  for(var p in Parent.prototype){
    if(Child.prototype[p] === undefined){
      Child.prototype[p] = Parent.prototype[p];
    }
  }
};

  /**
   * @class ClassManager manage all classes, helps to manipulate
   * @private
   * @constructor
   */
var ClassManager = function(){};
ClassManager.prototype = {
  items: new Fancy.Collection(),
  /*
   * Define class in global scope with it namespace
   * @param {String} key
   */
  add: function(key, value){
    var parts = key.split("."),
      i = 1,
      iL = parts.length - 1;
    
    Fancy.ns(key);
    
    var ref = Fancy.global[parts[0]];
    
    for(;i<iL;i++){
      ref = ref[parts[i]];
    }
    
    if(parts.length > 1){
      ref[parts[parts.length - 1]] = value;
    }
    else{
      Fancy.global[parts[0]] = value;
    }
    
    this.items.add(key, value);
  },
  /*
   * Returns class by key
   * param {String} key
   * @returns {Object}
   */
  get: function(key){
    return this.items.get(key);
  }
};

/**
 * @class Fancy.ClassManager manages all classes, helps to manipulate
 * @private
 * @singleton
 */
Fancy.ClassManager = new ClassManager();

/*
 * Define class
 * @method
 * @param {String|Array} name
 * @param {Object} config
 */
Fancy.Class = function(name, config){
  var config = config || {},
    names = [];
  
  if( Fancy.isArray(name) ){
    names = name;
    name = names[0];
  }
  
  if(config.constructor === Object){
    if(config.extend === undefined){
      config.constructor = function(){
        
      };
    }
    else{
      config.constructor = function(){
        this.Super('constructor', arguments);
      };
    }
  }
  
  if(config.extend === undefined){
    $classes[name] = config.constructor;
  }
  else{
    $classes[name] = config.constructor;
    
    var extendClass;
    switch(typeof config.extend){
      case 'string':
        extendClass = Fancy.ClassManager.get(config.extend);
        $classes[name].prototype.$Super = Fancy.ClassManager.get(config.extend);
        break;
      case 'function':
        extendClass = config.extend;
        $classes[name].prototype.$Super = config.extend;
        break;
    }
    delete config.extend;
    
    $classes[name].prototype.Super = function(method, args){
      var me = this;
      //console.log(me.$Super.prototype.$name);
      if( me.$Iam ){
        me.$Iam = Fancy.ClassManager.get( me.$Iam.prototype.$Super.prototype.$name );
      }
      else{
        me.$Iam = Fancy.ClassManager.get( me.$Super.prototype.$name );
      }
      //console.log(config);
      switch(method){
        case 'const':
        case 'constructor':
          me.$Iam.apply(me, args);
        break;
        default:
          //console.log(me.$Iam, method, name, config);
          //console.log(me.$Iam);
          me.$Iam.prototype[method].apply(me, args);
      }
      
      delete me.$Iam;
    };
    applyIf($classes[name], extendClass);
  }
  
  $classes[name].prototype.$name = name;
  
  if(config.traits){
    Fancy.trait( $classes[name].prototype, config.traits );
    delete $classes[name].prototype.traits;
  }
  
  if(config.plugins !== undefined){
    if( $classes[name].prototype.$plugins === undefined ){
      $classes[name].prototype.$plugins = [];
    }
    
    $classes[name].prototype.$plugins = $classes[name].prototype.$plugins.concat( config.plugins );
    delete $classes[name].prototype.plugins;
  }
  
  for(var p in config){
    $classes[name].prototype[p] = config[p];
  }
  
  var _classRef = $classes[name];
  
  if( config.singleton === true ){
    delete $classes[name];
    _classRef = new _classRef(config);
    $classes[name] = _classRef;
    
  }
  
  if( names.length > 1 ){
    Fancy.each(names, function(name){
      Fancy.ClassManager.add(name, _classRef);
    });
  }
  else{
    Fancy.ClassManager.add(name, _classRef);
  }
  
  if(config.type){
    $types[config.type] = _classRef;
    Fancy.addWidgetType(config.type, _classRef);
  }
  else if(config.ptype){
    $types[config.type] = _classRef;
    Fancy.addPluginByType(config.ptype, _classRef);
  }
};

/*
 * Returns class by it's type
 * @param {String} type
 * @returns {Object}
 */
Fancy.getClassByType = function(type){
  return $types[type];
};

})();
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
(function(){
var seedFn = 0,
  fns = {};


Fancy.Class(['Fancy.Event', 'Fancy.Observable'], {
  traits: {
    classes: [
      Fancy.TraitClass
    ]
  },
  constructor: function(config){
    var me = this,
      config = config || {};

    Fancy.applyConfig(me, config);

    me.$events = {};
    if(me.listeners || me.events){
      var listeners = me.listeners || me.events,
        i = 0,
        iL = listeners.length;

      for(;i<iL;i++){
        var lis = listeners[i],
          eventName = null,
          handler = null,
          scope = null,
          params = [];

        for(var p in lis){
          if(p === 'scope'){
            scope = lis[p];
          }
          else if(p === 'params'){
            params = lis[p];
          }
          else{
            eventName = p;
            handler = lis[p];
          }
        }

        if(eventName === null || Fancy.isFunction(handler) === false){
          throw new Error('Event was not set');
        }

        if(Fancy.isArray(params) === false){
          throw new Error('params must be array');
        }

        me.addEvent(eventName);
        me.on(eventName, handler, scope, params);
      }
    }
  },
  on: function(eventName, fn, scope, params){
    if( this.$events[eventName] === undefined ){
      console.log(arguments);
      throw new Error('Event name is not set: ' + eventName);
    }

    fn.$mtFnSeed = seedFn;
    fns[seedFn] = fn;
    seedFn++;

    this.$events[eventName].push({
      fn:fn,
      scope: scope,
      params: params || []
    });
  },
  un: function(eventName, fn){
    var me = this,
      $events = me.$events[eventName];

    if(!$events){
      return false;
    }

    var i = 0,
      iL = $events.length;

    for(;i<iL;i++){
      var lis = $events[i];
      if(lis.fn.$mtFnSeed === fn.$mtFnSeed){
        lis.toRemove = true;
        //$events.splice(i, 1);
        return true;
      }
    }
    return false;
  },
  once: function(eventName, fn, scope){
    var me = this,
      fnWrapper = function(){
        fn.apply(this, arguments);
        me.un(eventName, fnWrapper);
      };

    me.on(eventName, fnWrapper, scope);
  },
  unAll: function(){
    this.$events = {};
  },
  unAllByType: function(eventName){
    this.$events[eventName] = [];
  },
  fire: function(eventName){
    var me = this,
      $events = me.$events[eventName];

    if(!$events){
      return false;
    }

    var i = 1,
      iL = arguments.length,
      args = [me];

    for(;i<iL;i++){
      args.push(arguments[i]);
    }

    var i = 0,
      iL = $events.length;

    for(;i<iL;i++){
      var lis = $events[i],
        _args = [];

      if( lis.toRemove === true ){
        $events.splice(i, 1);
        i--;
        iL = $events.length;
        continue;
      }

      _args = _args.concat(args);
      if( lis.params ){
        _args = _args.concat(lis.params);
      }

      lis.fn.apply(lis.scope || me, _args);
    }
  },
  addEvent: function(eventName){
    var me = this;

    me.$events[eventName] = me.$events[eventName] || [];
  },
  addEvents: function(eventName){
    var me = this;
    if(arguments.length > 1){
      var tempEventName = [],
        i = 0,
        iL = arguments.length;

      for(;i<iL;i++){
        tempEventName[i] = arguments[i];
      }
      eventName = tempEventName;
    }
    if(Fancy.typeOf(eventName) === 'string'){
      me.$events[eventName] = me.$events[eventName] || [];
    }
    else if(Fancy.typeOf(eventName) === 'array'){
      var i = 0,
        iL = eventName.length;

      for(;i<iL; i++){
        me.$events[eventName[i]] = me.$events[eventName[i]] || [];
      }
    }
  },
  has: function(eventName){
    var lis = this.$events[eventName];
    if(!lis){
      return false;
    }

    return lis.length !== 0;
  }
});

})();
Fancy.$ = $;

/*
  Fancy.Element
*/
Fancy.get = function(id){
  var type = Fancy.typeOf(id);

  switch(type){
    case 'string':
      return new Fancy.Element(Fancy.$('#'+id)[0]);
      break;
    default:
      return new Fancy.Element(id);
      break;
  }
};

Fancy.Element = function(dom){
  var me = this;

  me.dom = dom;
  me.$dom = Fancy.$(dom);
};

Fancy.Element.prototype = {
  on: function(eventName, fn, scope){
    var me = this;
    if( scope ){
      me.$dom.on(eventName, $.proxy(fn, scope));
    }
    else{
      me.$dom.on(eventName, fn);
    }
  },
  un: function(){

  },
  getByClass: function(cls){
    var me = this;
    return me.$dom.find('.'+cls)[0];
  },
  getByTag: function(tag){
    var me = this;
    return Fancy.get(me.$dom.find(tag)[0]);
  },
  addClass: function(cls){
    var me = this;

    me.$dom.addClass(cls);
  },
  removeClass: function(cls){
    var me = this;

    me.$dom.removeClass(cls);
  },
  hasClass: function(cls){
    var me = this;

    return me.$dom.hasClass(cls);
  },
  toggleClass: function(cls){
    var me = this;

    me.$dom.toggleClass(cls);
  },
  select: function(selector){
    var me = this;

    return me.$dom.find(selector);
  },
  attr: function(o1, o2){
    if( o2 === undefined ){
      return this.$dom.attr(o1);
    }
    return this.$dom.attr(o1, o2);
  },
  css: function(o1, o2){
    if( o2 === undefined ){
      return this.$dom.css(o1);
    }
    return this.$dom.css(o1, o2);
  },
  append: function(html){
    return this.$dom.append(html)[0];
  },
  height: function(){
    return this.$dom.height();
  },
  width: function(){
    return this.$dom.width();
  },
  parent: function(selector){
    return Fancy.get(this.$dom.parent(selector)[0]);
  },
  update: function(html){
    this.dom.innerHTML = html;
  }
};


Fancy.select = function(selector){
  return Fancy.get(document.body).select(selector);
};

/*
  Fancy.onReady
*/

Fancy.onReady = function(fn){
  $(document).ready(fn);
};

Fancy.Ajax = function(o){
  var _o = {};

  if( o.url ){
    _o.url = o.url;
  }

  if( o.success ){
    _o.success = o.success;
  }

  if( o.error ){
    _o.error = o.error;
  }

  if( o.method ){
    //_o.type = o.type;
    _o.type = o.method;
  }

  if( o.params ){
    _o.data = o.params;
  }

  $.ajax(_o);
};
/**
 * @class Fancy.Widget
 * @extends Fancy.Event
 */
Fancy.Class('Fancy.Widget', {
  extend: Fancy.Event,
  constructor: function(config){
    var me = this;

    Fancy.applyConfig(me, config);

    me.Super('const', arguments);

    me.init();
  },
  init: function(){
    var me = this;

    me.initId();
    me.addEvents('beforerender', 'afterrender', 'render', 'show', 'hide', 'destroy');
    me.initPlugins();
  },
  renderItems: function(renderTo){
    var me = this,
      i = 0,
      iL = me.items.length;

    for(;i<iL;i++){
      var item = me.items[i],
        w = Fancy.getClassByType(item.type);

      item.renderTo = renderTo;
      me.items[i] = new w(item);
    }
  }
});
/**
 * @class Fancy.Button
 * @extends Fancy.Widget
 */
Fancy.Class('Fancy.Button', {
  extend: Fancy.Widget,
  constructor: function(config, scope){
    var me = this;

    me.scope = scope;

    me.Super('const', arguments);
  },
  init: function(){
    var me = this;

    me.addEvents('click', 'mousedown', 'mouseup', 'mouseover', 'mouseout');
    me.Super('init', arguments);

    me.style = me.style || {};

    me.render();
    me.setOns();
  },
  setOns: function(){
    var me = this,
      el = me.el;

    el.on('click', me.onClick, me);
    el.on('mousedown', me.onMouseDown, me);
    el.on('mouseup', me.onMouseUp, me);
    el.on('mouseover', me.onMouseOver, me);
    el.on('mouseout', me.onMouseOut, me);
  },
  cls: 'fancy fancy-button',
  text: '',
  height: 28,
  paddingTextWidth: 5,
  render: function(){
    var me = this,
      renderTo = Fancy.get(me.renderTo || document.body).dom,
      el = document.createElement('div'),
      width = 0;

    me.fire('beforerender');

    if( me.width ){
      width = me.width;
    }
    else{
      width = me.paddingTextWidth * 2;
      width += me.text.length * 7;
    }

    el.className = me.cls;
    el.style.width = width + 'px';
    el.style.height = me.height + 'px';

    el.innerHTML = [
      '<div class="fancy-button-text">',
        me.text,
      '</div>'
    ].join('');

    me.el = Fancy.get( renderTo.appendChild(el) );

    Fancy.each(me.style, function(value, p){
      me.el.css(p, value);
    });
    
    if( me.disabled ){
      me.disable();
    }

    me.fire('afterrender');
    me.fire('render');
  },
  onClick: function(){
    var me = this;

    me.fire('click');
    if( me.handler ){
      if( me.scope ){
        me.handler.apply(me.scope, [me]);
      }
      else{
        me.handler(me);
      }
    }
  },
  onMouseDown: function(){
    var me = this;

    me.fire('mousedown');
  },
  onMouseUp: function(){
    var me = this;

    me.fire('mouseup');
  },
  onMouseOver: function(){
    var me = this;

    me.fire('mouseover');
  },
  onMouseOut: function(){
    var me = this;

    me.fire('mouseout');
  },
  setText: function(text){
    var me = this;

    Fancy.get(me.el.select('.fancy-button-text')[0]).update(text);
  },
  disable: function(){
    var me = this;
    
    me.el.addClass('fancy-button-disabled');
  },
  enable: function(){
    var me = this;
    
    me.el.removeClass('fancy-button-disabled');
  }
});
/**
 * @class Fancy.toolbar.Tab
 * @extends Fancy.Button
 */
Fancy.Class('Fancy.toolbar.Tab', {
  extend: Fancy.Button,
  constructor: function(config, scope){
    var me = this;

    me.scope = scope;

    me.Super('const', arguments);
  },
  init: function(){
    var me = this;
  
    me.Super('init', arguments);
  },
  cls: 'fancy fancy-button fancy-toolbar-tab',
  render: function(){
    var me = this;

    me.Super('render', arguments);
  }
});
Fancy.Class('Fancy.Panel', {
  extend: Fancy.Widget,
  constructor: function(){
    var me = this,
      config = config || {};

    Fancy.apply(me, config);

    me.Super('constructor', arguments);
  },
  init: function(){
    var me = this;

    me.Super('init', arguments);
    me.render();
  },
  cls: 'fancy fancy-panel',
  value: '',
  width: 300,
  height: 200,
  titleHeight: 30,
  title: undefined,
  frame: false,
  shadow: true,
  render: function(){
    var me = this,
      renderTo = Fancy.get(me.renderTo || document.body),
      el = document.createElement('div'),
      cls = me.cls,
      isTitle = me.title !== undefined,
      minusHeight = 0,
      titleHeight = me.titleHeight;

    if( me.theme ){
      cls += ' fancy-theme-' + me.theme;
    }

    if( me.shadow ){
      cls += ' fancy-panel-shadow';
    }

    el.className = cls;
    el.style.width = me.width + 'px';
    el.style.height = (me.height - minusHeight) + 'px';

    if( me.style ){
      Fancy.apply(el.style, me.style);
    }

    el.innerHTML = [
      '<div style="'+(isTitle?'':'display: none;')+'height:'+titleHeight+'px;" class="fancy-panel-header">',
        '<div class="fancy-panel-header-text">',
          me.title,
        '</div>',
        '<div class="fancy-panel-header-tools">',
        '</div>',
      '</div>',
      '<div class="fancy-panel-body ' + '' + '">',

      '</div>'
    ].join('');

    me.el = renderTo.dom.appendChild(el);
    me.el = Fancy.get(me.el);

    if( me.modal ){
      if( Fancy.select('fancy-modal').length === 0 ){
        Fancy.get(document.body).append('<div class="fancy-modal" style="display: none;"></div>');
      }
    }

    me.renderTools();
  },
  renderTools: function(){
    var me = this,
      tools = me.tools;

    if( tools === undefined ){
      return;
    }

    var i = 0,
      iL = tools.length;

    for(;i<iL;i++){
      me.tools[i].renderTo = me.el.select('.fancy-panel-header-tools')[0];
      me.tools[i] = new Fancy.Tool(me.tools[i], me.scope);
    }
  }
});
/**
 * @class Fancy.Tool
 * @extends Fancy.Widget
 */
Fancy.Class('Fancy.Tool', {
  extend: Fancy.Widget,
  constructor: function(config, scope){
    var me = this;

    me.scope = scope;

    me.Super('const', arguments);
  },
  init: function(){
    var me = this;

    me.addEvents('click', 'mousedown', 'mouseup', 'mouseover', 'mouseout');
    me.Super('init', arguments);

    me.style = me.style || {};

    me.render();
    me.setOns();
  },
  setOns: function(){
    var me = this,
      el = me.el;

    el.on('click', me.onClick, me);
  },
  cls: 'fancy fancy-button',
  text: '',
  height: 28,
  paddingTextWidth: 5,
  render: function(){
    var me = this,
      renderTo = Fancy.get(me.renderTo || document.body).dom,
      el = document.createElement('div'),
      width = 0;

    me.fire('beforerender');

    el.className = 'fancy-tool-button';
    el.innerHTML = me.text;
    me.el = Fancy.get( renderTo.appendChild(el) );

    me.fire('afterrender');
    me.fire('render');
  },
  onClick: function(){
    var me = this;

    me.fire('click');
    if( me.handler ){
      if( me.scope ){
        me.handler.apply(me.scope, [me]);
      }
      else{
        me.handler(me);
      }
    }
  },
  setText: function(value){
    var me = this;

    me.el.update(value)
  }
});
/**
 * @class Fancy.Form
 * @extends Fancy.Widget
 */
Fancy.Class('Fancy.Form', {
  extend: Fancy.Widget,
  type: 'form',
  theme: 'default',
  constructor: function(config){
    var me = this;

    config = me.prepareConfig(config);

    var titleHeight = config.titleHeight || 30,
      titleBorders = config.titleBorders || [1,1,1,1],
      buttonBarHeight = config.buttonsBarHeight || 37,
      buttonBarBorders = config.buttonBarBorders || [1,0,0,0],
      formBorders = config.formBorders || [1,1,1,1],
      style = {};

    if( config.window === true ){
      style['display'] = 'none';
      style['position'] = 'absolute';
    }

    me.titleHeight = titleHeight;
    me.titleBorders = titleBorders;
    me.buttonBarHeight = buttonBarHeight;
    me.buttonBarBorders = buttonBarBorders;
    me.formBorders = formBorders;

    var p = new Fancy.Panel({
      renderTo: config.renderTo,
      title: config.title,
      titleBorders: titleBorders,
      width: config.width,
      height: config.height,
      buttons: config.buttons,
      tabs: config.tabs,
      buttonBarHeight: buttonBarHeight,
      titleHeight: titleHeight,
      style: style,
      modal: config.modal,
      theme: config.theme || '',
      tools: config.tools || undefined,
      scope: me
    });
    config.renderTo = p.el.getByClass('fancy-panel-body');
    config.isPanel = true;

    me.Super('const', arguments);
  },
  prepareConfig: function(o){
    if( !o.id && !o.renderTo ){
      o.window = true;
      if( o.modal === undefined ){
        o.modal = true;
      }
    }

    if( o.theme === 'light-blue' ){
      if( Fancy.isObject( o.title ) ){
        o.title.height = 40;
      }
      else if(Fancy.isString(o.title)){
        o.title = {
          text: o.title,
          height: 40
        };
      }

      o.borders = [1,2,2,2];

      if( o.buttons ){
        if( Fancy.isObject(o.buttons) ){
          o.buttons.height = 44;
        }
        else if(Fancy.isArray(o.buttons)){
          o.buttons = {
            height: 44,
            items: o.buttons
          };
        }
      }
    }

    if( o.borders ){
      o.formBorders = o.borders;
    }

    if( Fancy.isObject(o.title) ){
      var title = o.title;

      if( title.text ){
        o.title = title.text;
      }

      if( title.height ){
        o.titleHeight = title.height;
      }

      if( title.borders ){
        o.titleBorders = title.borders;
      }
    }

    if( Fancy.isObject(o.buttons) ){
      var buttons = o.buttons;

      if( buttons.items ){
        o.buttons = buttons.items;
      }

      if( buttons.height ){
        o.buttonsBarHeight = buttons.height;
      }

      if( buttons.borders ){
        o.buttonsBarBorders = buttons.borders;
      }
    }
    
    return o;
  },
  init: function(){
    var me = this;

    me.Super('init', arguments);

    if( me.defaults ){
      for(var p in me.defaults){
        Fancy.each(me.items, function(item){
          if( item[p] === undefined ){
            item[p] = me.defaults[p];
          }
        });
      }
    }

    Fancy.each(me.items, function(item){
      item.theme = me.theme || '';
      if( item.labelWidth === undefined ){
        item.labelWidth = me.labelWidth;
      }
      if( item.inputWidth === undefined ){
        item.inputWidth = me.inputWidth;
      }
      if( item.type === 'pass' || item.type === 'password' ){
        item.type = 'string';
        item.isPassword = true;
      }
    });

    me.addEvents();

    me.tpl = new Fancy.Template(me.tpl)
    me.render();
    me.ons();
  },
  cls: 'fancy fancy-form',
  value: '',
  width: 200,
  emptyText: '',
  labelWidth: 65,
  inputWidth: 100,
  tpl: [
    '<div class="fancy-panel-tbar" style="{isTBar}{buttonBarHeight}">',
    '</div>',
    '<div class="fancy-form-body">',
    '</div>',
    '<div class="fancy-panel-bbar" style="{isBBar}{buttonBarHeight}">',
    '</div>'
  ],
  render: function(){
    var me = this,
      renderTo = me.renderTo || document.body,
      el = document.createElement('div'),
      isTBar = 'display: none;',
      isBBar = 'display: none;',
      buttonBarHeight = me.buttonBarHeight,
      titleHeight = me.titleHeight;

    if( me.tabs ){
      isTBar = '';
    }  
      
    if( me.buttons ){
      isBBar = '';
    }

    me.fire('beforerender');

    me.height -= me.formBorders[0];
    me.height -= me.formBorders[2];

    if( me.isPanel === true ){
      Fancy.get(el).css('border-width', '0px');

      if( me.title ){
        me.height -= titleHeight;
        me.height -= me.titleBorders[0];
        me.height -= me.titleBorders[2];
      }
    }

    el.className = me.cls;
    el.style.width = me.width + 'px';
    el.style.height = me.height + 'px';

    el.innerHTML = me.tpl.getHTML({
      isTBar: isTBar,
      isBBar: isBBar,
      buttonBarHeight: 'height:'+buttonBarHeight+'px'
    });

    me.el = Fancy.get(renderTo.appendChild(el));
    me.renderItems(me.el.getByClass('fancy-form-body'));
    me.setActiveTab();

    if( me.tabs ){
      //var i = me.tabs.length;
      var i = 0,
        iL = me.tabs.length;
      
      for(;i<iL;i++){
        var tabConfig = {};
        
        if( Fancy.isString(me.tabs[i]) ){
          tabConfig.text = me.tabs[i];
        }
        else{
          tabConfig = me.tabs[i];
        }
        
        tabConfig.renderTo = me.el.getByClass('fancy-panel-tbar');
        me.tabs[i] = tabConfig;
        //if( me.activeTab !== Math.abs(i - (me.tabs.length - 1)) ){
        if( me.activeTab !== i ){
          me.tabs[i].disabled = true;
        }
        
        if( me.tabs[i].handler === undefined ){
          me.tabs[i].handler = (function(i){
            return function(){
              me.setActiveTab(i);
              var _i = 0,
                _iL = me.tabs.length;
              
              for(;_i<_iL;_i++){
                me.tabs[_i].disable();
              }
              
              me.tabs[i].enable();
            }
          })(i);
        }
        
        me.tabs[i] = new Fancy.toolbar.Tab(me.tabs[i], me);
      }
    }
    
    if( me.buttons ){
      var i = me.buttons.length;
      while(i--){
        me.buttons[i].renderTo = me.el.getByClass('fancy-panel-bbar');
        me.buttons[i] = new Fancy.Button(me.buttons[i], me);
      }
    }

    me.fire('afterrender');
    me.fire('render');
  },
  renderItems: function(renderTo, items, _i){
    var me = this,
      items = items || me.items,
      i = 0,
      iL = items.length,
      subItems = [],
      _i = _i || 0;

    for(;i<iL;i++){
      var item = items[i],
        w;

      item.theme = me.theme;

      switch(item.type){
        case 'pass':
        case 'password':
          w = Fancy.form.field.String;
          item.type = 'string';
          item.isPassword = true;
          break;
        case 'hidden':
          w = Fancy.form.field.String;
          item.hidden = true;
          break;
        case 'line':
        case 'row':
          w = Fancy.form.field.Line;
          if( item.defaults ){
            var j = 0,
              jL = item.items.length;

            for(;j<jL;j++){
              Fancy.applyIf(item.items[j], item.defaults);
            }
          }
          break;
        case 'set':
        case 'fieldset':
          w = Fancy.form.field.Set;
          item.form = me;
          if( item.defaults ){
            var j = 0,
              jL = item.items.length;

            for(;j<jL;j++){
              Fancy.applyIf(item.items[j], item.defaults);
            }
          }
          break;
        case 'string':
          w = Fancy.form.field.String;
          break;
        case 'number':
          w = Fancy.form.field.Number;
          break;
        case 'textarea':
          w = Fancy.form.field.TextArea;
          break;
        case 'checkbox':
          w = Fancy.form.field.CheckBox;
          break;
        case 'combo':
          w = Fancy.form.field.Combo;
          break;
        case 'html':
          w = Fancy.form.field.HTML;
          break;
        case 'radio':
          w = Fancy.form.field.Radio;
          break;
        case 'recaptcha':
          w = Fancy.form.field.ReCaptcha;
          break;
        case 'chat':
          w = Fancy.form.field.Chat;
          break;
        case 'tab':
          w = Fancy.form.field.Tab;
          item.form = me;
          if( item.defaults ){
            var j = 0,
              jL = item.items.length;

            for(;j<jL;j++){
              Fancy.applyIf(item.items[j], item.defaults);
            }
          }
          break;
        default:
          throw new Error('type ' + item.type + ' is not set');
      }

      item.renderTo = item.renderTo || renderTo;
      var _item = new w(item);

      switch(item.type){
        case 'line':
        case 'row':
        case 'set':
        case 'fieldset':
        case 'tab':
          subItems.push(_item);
          break;
        default:
          me.items[_i] = _item;
          _i++;
      }
    }

    var i = 0,
      iL = subItems.length;

    for(;i<iL;i++){
      var item = subItems[i];
      me.renderItems(item.el.select('.fancy-field-text')[0], item.items, _i);
      _i += item.items.length;
    }
  },
  setActiveTab: function(newActiveTab){
    var me = this,
      tabs = me.el.select('.fancy-field-tab'),
      oldActiveTab = me.el.select('.fancy-field-tab-active');
    
    if( newActiveTab !== undefined ){
      me.activeTab = newActiveTab;
    }
    
    if( me.activeTab === undefined ){
      return;
    }
    
    oldActiveTab.removeClass('fancy-field-tab-active');
    Fancy.get(tabs[me.activeTab]).addClass('fancy-field-tab-active');
  },
  ons: function(){
    var me = this;

    Fancy.each(me.items, function(item){
      switch(item.type){
        case 'line':
        case 'row':
          break;
        case 'set':
        case 'fieldset':
          item.on('collapsed', function(){
            //console.log('collapsed');
          });

          item.on('expanded', function(){
            //console.log('expanded');
          });
          break;
        case 'tab':
          
          break;
        default:
          item.on('key', function(){
            me.fire('key', item.name, item.get());
          });
      }
    });
  },
  prevTab: function(){
    var me = this;
    
    me.activeTab--;
    if( me.activeTab < 0 ){
      me.activeTab = 0;
    }
    
    me.setActiveTab();
  },
  nextTab: function(){
    var me = this,
      tabNumber = me.el.select('.fancy-field-tab').length;
    
    me.activeTab++;
    
    if( me.activeTab >= tabNumber ){
      me.activeTab = tabNumber - 1;
    }
    
    me.setActiveTab();
  },
  get: function(name){
    var me = this;

    if( name ){
      var value;
      Fancy.each(me.items, function(item){
        if( item.type === 'html' ){
          return;
        }

        if( item.name === name ){
          value = item.get();
          return true;
        }
      });
      return value;
    }
    else{
      var values = {};

      Fancy.each(me.items, function(item){
        if( item.type === 'html' ){
          return;
        }

        values[item.name] = item.get();
      });

      return values;
    }
  },
  set: function(name, value){
    var me = this;

    if( name ){
      Fancy.each(me.items, function(item){
        if( item.name !== name ){
          return;
        }
        
        item.set(value);
      });
      return value;
    }
  },
  clear: function(clear){
    var me = this;

    Fancy.each(me.items, function(item){
      if( item.type === 'html' || item.type === 'recaptcha' ){
        return;
      }

      if( clear !== false ){
        item.clear();
      }
      var el = item.el;
      if( el.hasClass('fancy-field-not-valid') ){
        el.removeClass('fancy-field-not-valid');
        el.css('height', ( parseInt( el.css('height') ) - 6) + 'px');
      }
      if( el.hasClass('fancy-field-blank-err') ){
        el.removeClass('fancy-field-blank-err');
        el.css('height', ( parseInt( el.css('height') ) - 6) + 'px');
      }

      if( item.name && me.params && me.params[item.name] ){
        delete me.params[item.name];
      }
    });
  },
  submit: function(o){
    var me = this,
      o = o || {},
      params = me.params || {};

    me.params = me.params || {};

    Fancy.apply(me, o);

    if( o.params ){
      Fancy.apply(params, me.params);
      me.params = params;
    }

    me.clear(false);
    if( me.valid() === false ){
      return;
    }

    var values = me.get();

    Fancy.apply(me.params, values);

    if(me.params.recaptcha === 'wait'){
      me.submit(o);
      return;
    }

    if( me.params.recaptcha === '' ){
      return;
    }

    me.params['g-recaptcha-response'] = me.params.recaptcha;
    delete me.params.recaptcha;

    Fancy.Ajax(me);
  },
  valid: function(){
    var me = this,
      valid = true;

    Fancy.each(me.items, function(item){
      if( valid === true ){

        valid = item.onBlur();
      }
      else{
        item.onBlur();
      }
    });

    return valid;
  },
  show: function(){
    var me = this;

    if( me.window !== true ){
      return;
    }
    
    var viewSize = Fancy.getViewSize(),
      height = me.el.height(),
      width = me.el.width(),
      xy = [],
      scroll = Fancy.getScroll(),
      scrollTop = scroll[0],
      scrollLeft = scroll[1];
      
    xy[0] = (viewSize[1] - width)/2;
    xy[1] = (viewSize[0] - height)/2;

    if( xy[0] < 10 ){
      xy[0] = 10;
    }

    if( xy[1] < 10 ){
      xy[1] = 10;
    }

    var panel = me.el.parent().parent();

    panel.css({
      left: (xy[0] + scrollLeft) + 'px',
      top: (xy[1] + scrollTop) + 'px',
      display: '',
      "z-index": 1000 + Fancy.zIndex++
    });

    Fancy.select('.fancy-modal').css('display', '');
  },
  hide: function(){
    var me = this,
      panel = me.el.parent().parent();

    panel.css({
      display: 'none'
    });

    Fancy.select('.fancy-modal').css('display', 'none');
    var i = 0,
        iL = me.items.length;

    for(;i<iL;i++){
      if(me.items[i].type === 'combo'){
        me.items[i].hideList();
      }
    }
  },
  setHeight: function(height){
    var me = this;

    me.el.css('height', height + 'px');
  },
  getHeight: function(){
    var me = this;

    return parseInt(me.el.css('height'));
  }
});

//var FancyForm = Fancy.Form;
var FancyForm = function(o){
  if( !o.id ){
    o.window = true;
    if( o.modal === undefined ){
      o.modal = true;
    }
  }

  return Fancy.$.fn.FancyForm(o);
};

FancyForm.get = function(formId){
  console.log(Fancy.get(formId));
};

/*
FancyForm.vtype({
  type: 'email',
  reg: /dsfsd/,
  text: 'Incorect email'
});
*/
FancyForm.vtype = function(o){
  Fancy.form.field.Trait.prototype.vtypes[o.type] = o;
};

Fancy.$.fn.FancyForm = function(o){
  o.renderTo = $(this.selector)[0];

  return new Fancy.Form(o);
};
Fancy.ns('Fancy.form.field');
Fancy.form.field.Trait = function(){};

Fancy.form.field.Trait.prototype = {
  vtypes: {},
  ons: function(){
    var me = this,
      input = me.el.getByTag('input');

    me.input = input;
    input.on('blur', me.onBlur, me);
    input.on('focus', me.onFocus, me);
    input.on('input', me.onInput, me);
    input.on('keydown', me.onKeyDown, me);
    me.on('key', me.onKey, me);
  },
  prepareValid: function(){
    var me = this,
      valid = me.valid,
      vtypes = me.vtypes;

    if( valid && valid.type ){
      var type = vtypes[valid.type];

      if(!type){
        throw new Error('not right validation type - ' + valid.type);
      }
      Fancy.applyIf(me.valid, type);
    }
  },
  render: function(){
    var me = this,
      renderTo = me.renderTo || document.body,
      el = document.createElement('div');

    me.prepareValid();

    me.fire('beforerender');
    el.className = me.cls;

    var labelWidth = '',
      inputWidth = '',
      itemsHTML = '';

    if( me.itemsHTML ){
      itemsHTML = me.itemsHTML;
    }

    if( me.labelAlign === 'top' && me.label ){
      //auto fixing of wrang labelWidth.
      //will not fix right if user change color of label font-size to bigger
      if( me.labelWidth < me.label.length * 7 ){
        me.labelWidth = (me.label.length + 2) * 7;
      }
    }

    if( me.labelWidth ){
      labelWidth = 'width:' + me.labelWidth + 'px;';
    }

    if( me.inputWidth ){
      inputWidth = 'width:' + me.inputWidth + 'px;';
    }

    var label = me.label;

    if( me.label === '' ){
      label = '&nbsp;';
    }
    else if( me.label === undefined ){
      label = '&nbsp;';
    }
    else if(me.labelAlign !== 'right'){
      label += ':';
    }

    var labelDisplay = '',
      inputLabelDisplay = '',
      inputLabel = '',
      _labelWidth = me.labelWidth || 0;

    _labelWidth += 11;

    if( me.labelAlign === 'top' ){
      _labelWidth = 2;
    }

    if( me.label === false ){
      labelDisplay = 'display:none;';
    }

    if( !me.inputLabel ){
      inputLabelDisplay = 'display:none;';
    }
    else{
      inputLabel = me.inputLabel;
    }

    if( me.type === 'recaptcha' ){
      el.innerHTML = me.tpl.getHTML({
        key: me.key
      });
    }
    else{
      el.innerHTML = me.tpl.getHTML({
        labelWidth: labelWidth,
        label: label,
        labelDisplay: labelDisplay,
        inputLabelDisplay: inputLabelDisplay,
        inputLabel: inputLabel,
        emptyText: me.emptyText,
        inputWidth: inputWidth,
        value: me.value,
        height: me.height,
        itemsHTML: itemsHTML,
        errorTextStyle: ''
      });
    }

    me.el = renderTo.appendChild(el);
    me.el = Fancy.get(me.el);

    if( me.labelAlign === 'top' ){
      me.el.addClass('fancy-field-label-align-top');
      me.el.select('.fancy-field-text').css('float', 'none');
    }
    else if( me.labelAlign === 'right' ){
      //console.log('in 3');
      me.el.addClass('fancy-field-label-align-right');
      $(el).find('.fancy-field-label').insertAfter($(el).find('.fancy-field-text'));
      //me.el.select('.fancy-field-text').css('float', 'none');
    }
    else if(me.type !== 'radio'){
      //console.log(me.el);
      //me.el.select('.fancy-field-text').css('float', 'none');
    }

    me.acceptedValue = me.value;
    me.fire('afterrender');
    me.fire('render');

    if( me.type !== 'recaptcha' && me.type !== 'chat' ){
      setTimeout(function(){
        if( me.input ){
          if( me.input.dom.value.length === 0 ){
            if( me.prevColor === undefined ){
              me.prevColor = me.input.css('color');
            }

            me.input.css('color', 'grey');
          }
        }
      }, 1);
    }
  },
  onKeyDown: function(e){
    var me = this,
      keyCode = e.keyCode,
      key = Fancy.key;

    if( me.type === 'number' ){
      if( Fancy.Key.isNumControl(keyCode, e) === false ){
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    }

    switch(keyCode){
      case key.ENTER:
        me.fire('enter', me.getValue());
        if( me.type !== 'textarea' ){
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      case key.UP:
        if( me.type === 'number' ){
          var newValue = +me.get() + me.step;
          if( isNaN(newValue) ){
            newValue = me.min || 0;
          }
          if( me.max !== undefined && newValue > me.max ){
            newValue = me.max;
          }
          else if(newValue < me.min){
            newValue = me.min;
          }
          me.set(newValue);
        }
        me.fire('up', me.getValue());
        if( me.type !== 'textarea' ){
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      case key.DOWN:
        if( me.type === 'number' ){
          var newValue = +me.get() - me.step;
          if( isNaN(newValue) ){
            newValue = me.min || 0;
          }
          if( me.min !== undefined && newValue < me.min ){
            newValue = me.min;
          }
          else if(newValue > me.max){
            newValue = me.max;
          }
          me.set(newValue);
        }
        me.fire('up', me.getValue());
        if( me.type !== 'textarea' ){
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      case key.LEFT:
        break;
      case key.RIGHT:
        e.stopPropagation();
        break;
      default:
        setTimeout(function(){
          if( me.input ){
            if( me.input.dom.value.length === 0 ){
              if( me.prevColor === undefined ){
                me.prevColor = me.input.css('color');
              }

              me.input.css('color', 'grey');
            }
            else{
              if( me.prevColor ){
                me.input.css('color', me.prevColor);
              }
              else{
                me.input.css('color', ' ');
              }
            }
          }
        }, 1);
    }

    setTimeout(function(){
      me.fire('key', me.getValue());
    }, 1);
  },
  onKey: function(){
    var me = this,
      valid = me.valid;

    /*
      Fix IE bug
      default placehold color is not grey
    */

    if( valid && valid.type ){
      me.validate();
    }
  },
  onBlur: function(){
    var me = this,
      el = me.el,
      valid = me.valid,
      isValid = true;

    if( valid ){
      if( valid.blank === false && ((me.type==='combo' && me.get() === 0) || me.get().length === 0) ){
        el.addClass('fancy-field-blank-err');
        if( el.hasClass('fancy-field-not-valid') ){
          el.removeClass('fancy-field-not-valid');
          el.css('height', ( parseInt( el.css('height') ) - 6) + 'px');
        }
        if( valid.blankText ){
          el.css('height', ( parseInt( el.css('height') ) + 6) + 'px');
          el.select('.fancy-field-error')[0].innerHTML = valid.blankText;
        }
      }
      else if( valid.type ){
        me.validate();
      }
      else {
        el.removeClass('fancy-field-blank-err');
        el.removeClass('fancy-field-not-valid');
      }
    }

    if( el.hasClass('fancy-field-blank-err') ){
      isValid = false;
    }

    if( el.hasClass('fancy-field-not-valid') ){
      isValid = false;
    }

    me.fire('blur');
    return isValid;
  },
  onFocus: function(){
    var me = this,
      el = me.el;

    if( el.hasClass('fancy-field-blank-err') ){
      me.el.removeClass('fancy-field-blank-err');
      if( me.valid.blankText ){
        el.css('height', ( parseInt( el.css('height') ) - 6) + 'px');
      }
    }

    me.fire('focus');
  },
  onInput: function(){
    var me = this,
      input = me.input,
      value = me.getValue();

    me.acceptedValue = me.get();
    me.fire('input', value);
    me.fire('change', value);
  },
  get: function(){
    var me = this;

    return me.input.dom.value;
  },
  getValue: function(){
    return this.get();
  },
  set: function(value, onInput){
    var me = this;

    me.input.dom.value = value;
    if(onInput !== false){
      me.onInput();
    }
  },
  setValue: function(value, onInput){
    this.set(value, onInput);
  },
  clear: function(){
    this.set('');
  },
  validate: function(){
    var me = this,
      el = me.el,
      valid = me.valid,
      vtypes = me.vtypes,
      type = vtypes[valid.type];

    if(!type){
      throw new Error('not right validation type - ' + valid.type);
    }
    //console.log('in 2');
    var value = me.get(),
      hadNotValid = el.hasClass('fancy-field-not-valid');

    if( type.fn ){
      if( !type.fn(value) ){
        el.addClass('fancy-field-not-valid');
      }
      else{
        el.removeClass('fancy-field-not-valid');
      }
    }
    else if(type.re){
      if( !type.re.test(value) ){
        el.addClass('fancy-field-not-valid');
      }
      else{
        el.removeClass('fancy-field-not-valid');
      }
    }

    var nowHadNotValid = el.hasClass('fancy-field-not-valid');

    if( hadNotValid === false && nowHadNotValid === true ){
      if( valid.text ){
        el.css('height', ( parseInt( el.css('height') ) + 6) + 'px');
      }
    }

    if( hadNotValid === true && nowHadNotValid === false ){
      if( valid.text ){
        el.css('height', ( parseInt( el.css('height') ) - 6) + 'px');
      }
    }

    if( nowHadNotValid ){
      //console.log(valid.text);
      el.select('.fancy-field-error')[0].innerHTML = valid.text;
    }

    return nowHadNotValid;
  }
};

FancyForm.vtype({
  type: 'email',
  re: /^(")?(?:[^\."])(?:(?:[\.])?(?:[\w\-!#$%&'*+\/=?\^_`{|}~]))*\1@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/,
  text: 'Incorect email'
});
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
Fancy.Class(['Fancy.form.field.TextArea', 'Fancy.TextArea'], {
  traits: {
    classes: [
      Fancy.form.field.Trait
    ]
  },
  extend: Fancy.Widget,
  type: 'field.textarea',
  constructor: function(){
    var me = this;

    me.Super('const', arguments);
  },
  init: function(){
    var me = this;

    me.addEvents('focus', 'blur', 'input', 'up', 'down', 'change', 'key');
    me.Super('init', arguments);

    me.initHeight();

    me.tpl = new Fancy.Template(me.tpl);
    me.render();

    me.ons();
  },
  cls: 'fancy fancy-field fancy-textarea',
  value: '',
  width: 250,
  height: 100,
  labelWidth: 60,
  inputWidth: 180,
  minHeight: 100,
  maxHeight: 210,
  lineHeight: 12.5,
  emptyText: '',
  tpl: [
    '<div class="fancy-field-label" style="{labelWidth}{labelDisplay}">',
      '{label}',
    '</div>',
    '<div class="fancy-textarea-text">',
      '<textarea autocomplete="off" placeholder="{emptyText}" type="text" class="fancy-textarea-text-input" style="{inputWidth}height:{height}px;">{value}</textarea>',
      '<div class="fancy-field-error" style="{errorTextStyle}"></div>',
    '</div>',
    '<div class="fancy-clearfix"></div>'
  ],
  ons: function(){
    var me = this,
      input = me.el.getByTag('textarea');

    me.input = input;
    input.on('blur', me.onBlur, me);
    input.on('focus', me.onFocus, me);
    input.on('input', me.onInput, me);
    input.on('keydown', me.onKeyDown, me);

    if( me.autoHeight ){
      input.on('input', me.onChange, me);
    }
  },
  initHeight: function(){
    var me = this;

    if( me.autoHeight !== true ){
      return;
    }

    var height = me.value.match(/\n/g).length * me.lineHeight;

    if( height < me.minHeight ){
      height = me.minHeight;
    }
    else if(height > me.maxHeight){
      height = me.maxHeight;
      setTimeout(function(){
        var input = me.el.getByTag('textarea');

        input.css({
          'overflow-y': 'scroll'
        });
      }, 1);
    }

    me.height = height;
  },
  onChange: function(){
    var me = this,
      value = me.input.dom.value,
      input = me.el.getByTag('textarea'),
      height = value.match(/\n/g).length * me.lineHeight;

    if( height < me.minHeight ){
      height = me.minHeight;
      input.css({
        'overflow-y': 'hidden'
      });
    }
    else if(height > me.maxHeight){
      height = me.maxHeight;
      input.css({
        'overflow-y': 'scroll'
      });
    }
    else{
      console.log('in 4');
      input.css({
        'overflow-y': 'hidden'
      });
    }

    me.height = height;
  }
});
Fancy.Class(['Fancy.form.field.CheckBox', 'Fancy.CheckBox'], {
  traits: {
    classes: [
      Fancy.form.field.Trait
    ]
  },
  extend: Fancy.Widget,
  type: 'field.checkbox',
  constructor: function(){
    var me = this;

    me.Super('const', arguments);
  },
  init: function(){
    var me = this;

    me.addEvents('focus', 'blur', 'input', 'up', 'down', 'change', 'key');
    me.Super('init', arguments);

    me.tpl = new Fancy.Template(me.tpl);

    me.render({
      labelWidth: me.labelWidth,
      labelDispay: me.labelText? '': 'none',
      label: me.label
    });
    me.acceptedValue = me.value;
    me.set(me.value);

    me.ons();
  },
  labelText: '',
  labelWidth: 60,
  value: false,
  checkedCls: 'fancy-checkbox-on',
  cls: 'fancy fancy-field fancy-field-checkbox',
  tpl: [
    '<div class="fancy-field-label" style="{labelWidth}{labelDisplay}">',
      '{label}',
    '</div>',
    '<div class="fancy-field-text">',
      '<div class="fancy-field-checkbox-input" style=""></div>',
    '</div>',
    '<div class="fancy-field-input-label" style="inputLabelDisplay">',
      '{inputLabel}',
    '</div>',
    '<div class="fancy-clearfix"></div>'
  ],
  ons: function(){
    var me = this,
      el = me.el;

    el.on('click', me.onClick, me);
    el.on('mousedown', me.onMouseDown, me);
  },
  onClick: function(){
    var me = this,
      el = me.el,
      checkedCls = me.checkedCls;

    el.toggleClass(checkedCls);
    me.value = el.hasClass(checkedCls);
    me.fire('change', me.value);
  },
  onMouseDown: function(e){

    e.preventDefault();
  },
  set: function(value, fire){
    var me = this,
      el = me.el,
      checkedCls = me.checkedCls;

    if(value === true || value === 1){
      el.addClass(checkedCls);
      value = true;
    }
    else if(value === false || value === 0){
      el.removeClass(checkedCls);
      value = false;
    }
    else{
      throw new Error('not right value for checkbox ' + value);
    }

    me.value = value;
    if(fire !== false){
      me.fire('change', me.value);
    }
  },
  setValue: function(value, onInput){
    this.set(value, onInput);
  },
  getValue: function(){
    var me = this;

    return me.value;
  },
  get: function(){
    return this.getValue();
  },
  clear: function(){
    this.set(false);
  }
});
(function(){

var combos = {};

var hideCombos = function(id){
  for(var p in combos){
    if( p !== id ){
      combos[p].hideList();
    }
  }
};

Fancy.Class(['Fancy.form.field.Combo', 'Fancy.Combo'], {
  traits: {
    classes: [
      Fancy.form.field.Trait
    ]
  },
  extend: Fancy.Widget,
  type: 'field.combo',
  constructor: function(){
    var me = this;

    me.Super('const', arguments);
  },
  init: function(){
    var me = this;

    me.addEvents('focus', 'blur', 'input', 'up', 'down', 'change', 'key');
    me.Super('init', arguments);

    me.tpl = new Fancy.Template(me.tpl);
    //me.tplList = new Fancy.Template(me.tplList);
    me.render();

    me.ons();
    combos[me.id] = me;

    if( me.hidden ){
      me.el.css('display', 'none');
    }

    if( me.style ){
      me.el.css(me.style);
    }
  },
  cls: 'fancy fancy-field fancy-combo',
  width: 250,
  height: 100,
  labelWidth: 60,
  inputWidth: 180,
  listRowHeight: 25,
  emptyText: '',
  tpl: [
    '<div class="fancy-field-label" style="{labelWidth}{labelDisplay}">',
      '{label}',
    '</div>',
    '<div class="fancy-combo-text">',
      '<table cellspacing="0" cellpadding="0">',
        '<tbody>',
          '<tr>',
            '<td class="">',
              '<input value="{value}" type="text" class="fancy-combo-input" readonly="true" style="{inputWidth} ">',
            '</td>',
            '<td class="fancy-combo-dropdown-button" style="width: 20px; ">&nbsp;</td>',
          '</tr>',
        '</tbody>',
      '</table>',
      '<div class="fancy-field-error" style="{errorTextStyle}"></div>',
      //'{listHTML}',
    '</div>',
    '<div class="fancy-clearfix"></div>'
  ],
  /*
  tplList: [
    '<div class="fancy-combo-result-list" style="width: {width}px;">',
      '<ul style="position: relative;">',
        '<tpl for="items">',
          '<li>{text}</li>',
        '</tpl>',
      '</ul>',
    '</div>'
  ],
  */
  ons: function(){
    var me = this,
      table = me.el.getByTag('table'),
      listEl = me.listEl;

    me.input = me.el.getByTag('input');

    me.onsList();

    table.on('mousedown', function(e){
      e.preventDefault();
    });

    table.on('click', function(e){
      var el = Fancy.get(e.currentTarget).parent(),
        p = el.$dom.offset(),
        xy = [p.left, p.top + el.$dom.height()];

      if( listEl.css('display') === 'none'){
        listEl.css({
          display: '',
          left: xy[0] + 'px',
          top: xy[1] + 'px',
          width: el.css('width'),
          "z-index": 2000 + Fancy.zIndex++
        });
        hideCombos(me.id);
      }
      else{
        listEl.css('display', 'none');
      }
    });
  },
  onsList: function(){
    var me = this,
      listEl = me.listEl,
      input = me.input,
      liEls = listEl.select('li'),
      lastOver;

    liEls.hover(function(e){
      if( lastOver ){
        lastOver.removeClass('fancy-combo-list-active');
      }
      Fancy.get(e.target).addClass('fancy-combo-list-active');
      lastOver = Fancy.get(e.target);
    });

    liEls.on('click', function(e){
      var liEl = Fancy.get(e.target),
        value = liEl.attr('value');

      if( me.displayKey ){
        //value = me.data[value][me.displayKey]
      }

      input.dom.value = value;
      //me.set( Number(liEl.attr('value')) );
      me.set( value );
      listEl.css('display', 'none');

      me.onBlur();
    });
  },
  render: function(){
    var me = this,
      renderTo = me.renderTo || document.body,
      el = document.createElement('div'),
      listEl = document.createElement('div'),
      value = me.value;

    if( value === undefined ){
      value = '';
    }
    else{
      var i = 0,
        iL = me.data.length,
        found = false;

      for(;i<iL;i++){
        if( me.data[i][me.valueKey] === value ){
          me.valueIndex = i;
          value = me.data[i][me.displayKey];
          found = true;
          break;
        }
      }

      if( found === false ){
        value = '';
      }
    }

    me.fire('beforerender');
    el.className = me.cls;

    var labelWidth = '',
      inputWidth = '';

    if( me.labelWidth ){
      labelWidth = 'width:' + me.labelWidth + 'px;';
    }

    if( me.inputWidth ){
      inputWidth = 'width:' + (me.inputWidth - 20) + 'px;';
    }

    var left = me.labelWidth + 8 + 10;

    if( me.labelAlign === 'top' ){
      left = 8;
    }

    if( me.labelAlign === 'right' ){
      left = 8;
    }

    var listHtml = [
      '<ul style="position: relative;">'
    ];

    Fancy.each(me.data, function(row, i){
      var isActive = '',
        value = row[me.displayKey];

      if( i === 0 ){
        isActive = 'fancy-combo-list-active';
      }

      if( value === '' || value === ' ' ){
        value = '&nbsp;';
      }

      listHtml.push('<li value="'+row[me.valueKey]+'" class="'+isActive+'">' + value + '</li>');
    });

    listHtml.push('</ul>');

    var label = me.label;

    if( me.label === '' ){
      label = '&nbsp;';
    }
    else if( me.label === undefined ){
      label = '&nbsp;';
    }
    else if(me.labelAlign !== 'right'){
      label += ':';
    }

    el.innerHTML = me.tpl.getHTML({
      //listHTML: listHtml.join(""),
      labelWidth: labelWidth,
      label: label,
      emptyText: me.emptyText,
      inputWidth: inputWidth,
      value: value,
      height: me.height
    });

    me.el = renderTo.appendChild(el);
    me.el = Fancy.get(me.el);
    //me.listEl = Fancy.get(me.el.getByClass('fancy-combo-result-list'));

    //'<div class="fancy-combo-result-list" style="display: none;left: '+left+'px;width: '+(me.inputWidth + 14)+'px;">',
    listEl.className = 'fancy-combo-result-list';
    if( me.theme ){
      listEl.className += ' fancy-theme-' + me.theme;
    }

    listEl.innerHTML = listHtml.join("");

    $(listEl).css({
      display: 'none',
      //left: left + 'px',
      left:  '0px',
      top: '0px',
      width: me.inputWidth + 14
    });

    if( me.data.length > 9 ){
      $(listEl).css({
        height: me.listRowHeight * 9 + 'px',
        overflow: 'auto'
      });
    }

    me.listEl = document.body.appendChild(listEl);
    me.listEl = Fancy.get(me.listEl);

    if( me.labelAlign === 'top' ){
      me.el.addClass('fancy-field-label-align-top');
    }
    else if( me.labelAlign === 'right' ){
      me.el.addClass('fancy-field-label-align-right');
      $(el).find('.fancy-field-label').insertAfter($(el).find('.fancy-combo-text'));
    }

    me.el.select('.fancy-combo-result-list').css('left', me.el.select('.fancy-combo-text').position().left + 'px');

    if( me.valueIndex ){
      me.acceptedValue = me.value;
    }

    me.fire('afterrender');
    me.fire('render');
  },
  getValue: function(){
    var me = this;

    if( me.value === -1 || me.value === undefined ){
      return '';
    }

    if( me.valueKey !== undefined ){
      return me.value;
      //return me.data[me.value][me.valueKey];
    }
    return me.value;
  },
  get: function(){
    return this.getValue();
  },
  set: function(value, onInput){
    var me = this,
      valueStr = '';

    var i = 0,
      iL = me.data.length,
      found = false;

    for(;i<iL;i++){
      if( me.data[i][me.valueKey] == value ){
        me.valueIndex = i;
        valueStr = me.data[i][me.displayKey];
        found = true;
        break;
      }
    }

    if( found === false ){
      valueStr = '';
    }

    me.value = value;

    if( value === -1 ){
      me.input.dom.value = '';
    }
    else{
      //me.input.dom.value = me.data[me.value][me.displayKey];
      me.input.dom.value = valueStr;
    }

    if(onInput !== false){
      me.onInput();
    }
  },
  setValue: function(value, onInput){
    this.set(value, onInput);
  },
  setData: function(data){
    var me = this,
      listHtml = [];

    me.data = data;

    Fancy.each(me.data, function(row, i){
      var isActive = '',
        value = row[me.displayKey];

      if( i === 0 ){
        isActive = 'fancy-combo-list-active';
      }

      if( value === '' || value === ' ' ){
        value = '&nbsp;';
      }

      listHtml.push('<li value="'+row[me.valueKey]+'" class="'+isActive+'">' + value + '</li>');
    });

    Fancy.get(me.listEl.select('ul')[0]).update(listHtml.join(""));
    me.onsList();
  },
  onInput: function(){
    var me = this,
      value = me.getValue();

    me.acceptedValue = me.get();
    me.fire('change', value);
  },
  clear: function(){
    var me = this;

    //me.set(0, true);
    me.set(-1, false);
  },
  hideList: function(){
    var me = this,
      listEl = me.listEl;

    listEl.css('display', 'none');
  }
});

})();
Fancy.Class(['Fancy.form.field.Line', 'Fancy.FieldLine'], {
  traits: {
    classes: [
      Fancy.form.field.Trait
    ]
  },
  extend: Fancy.Widget,
  type: 'field.line',
  constructor: function(config){
    var me = this,
      config = config || {};

    Fancy.apply(me, config);

    me.Super('const', arguments);
  },
  init: function(){
    var me = this;

    me.addEvents();

    me.Super('init', arguments);

    me.tpl = new Fancy.Template(me.tpl);

    var i = 0,
      iL = me.items.length,
      isItemTop;

    for(;i<iL;i++){
      var item = me.items[i];

      item.style = item.style || {};

      if( item.labelAlign === 'top' ){
        isItemTop = true;
        //break;
      }
      else{
        item.style['padding-top'] = '0px'
      }

      if( i === 0 ){
        item.style['padding-left'] = '0px';
      }
    }

    me.render();

    if( isItemTop ){
      me.el.css('height', '48px');
    }
  },
  cls: 'fancy fancy-field fancy-field-line',
  value: '',
  width: 100,
  emptyText: '',
  tpl: [
    '<div class="fancy-field-text fancy-field-line-items">',
    '</div>'
  ]
});
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
Fancy.Class(['Fancy.form.field.Tab', 'Fancy.Tab'], {
  traits: {
    classes: [
      Fancy.form.field.Trait
    ]
  },
  extend: Fancy.Widget,
  type: 'field.tab',
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
  },
  cls: 'fancy fancy-field-tab',
  value: '',
  width: 100,
  emptyText: '',
  tpl: [
    '<div class="fancy-field-text fancy-field-tab-items">',
    '</div>'
  ]
});
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
Fancy.Class(['Fancy.form.field.Radio', 'Fancy.Radio'], {
  traits: {
    classes: [
      Fancy.form.field.Trait
    ]
  },
  extend: Fancy.Widget,
  type: 'field.radio',
  constructor: function(){
    var me = this;

    me.Super('const', arguments);
  },
  init: function(){
    var me = this;

    me.addEvents('focus', 'blur', 'input', 'up', 'down', 'change', 'key');
    me.Super('init', arguments);

    me.tpl = new Fancy.Template(me.tpl);

    var itemsHTML = '',
      items = me.items,
      i = 0,
      iL = items.length;

    if( me.column ){
      me.cls += ' fancy-field-radio-column';
      itemsHTML += '<div style="margin-left: '+ ( me.labelWidth + 10 )+'px;">';
    }

    for(;i<iL;i++){
      var item = items[i],
        marginLeft = '',
        itemCls = 'fancy-field-text';

      if( !me.column && i !== 0 ){
        marginLeft = 'margin-left:10px;';
      }

      if( item.value === me.value ){
        itemCls += ' fancy-field-radio-on';
      }

      itemsHTML += [
        '<div class="'+itemCls+'" value='+item.value+'>',
          '<div class="fancy-field-radio-input" style="float:left;'+marginLeft+'"></div>',
          '<div style="float:left;margin:7px 0px 0px 0px;">'+item.text+'</div>',
        '</div>'
      ].join("");
    }

    if( me.column ){
      itemsHTML += '</div>';
    }

    me.itemsHTML = itemsHTML;

    me.render();
    me.acceptedValue = me.value;
    me.set(me.value);

    me.ons();
  },
  labelText: '',
  labelWidth: 60,
  value: false,
  checkedCls: 'fancy-field-radio-on',
  cls: 'fancy fancy-field fancy-field-radio',
  tpl: [
    '<div class="fancy-field-label" style="{labelWidth}{labelDisplay}">',
      '{label}',
      '<div class="fancy-field-error" style="{errorTextStyle}"></div>',
    '</div>',
    '{itemsHTML}',
    '<div class="fancy-clearfix"></div>'
  ],
  ons: function(){
    var me = this,
      el = me.el;

    el.$dom.delegate('.fancy-field-text', 'click', function(){
      me.set(Fancy.get(this).attr('value'));
    });

    el.on('mousedown', me.onMouseDown, me);
  },
  onClick: function(){
    var me = this,
      el = me.el,
      checkedCls = me.checkedCls;

    me.addClass(checkedCls);

    el.toggleClass(checkedCls);
    me.value = el.hasClass(checkedCls);
    me.fire('change', me.value);
  },
  onMouseDown: function(e){

    e.preventDefault();
  },
  set: function(value, fire){
    var me = this,
      el = me.el,
      checkedCls = me.checkedCls,
      radioEls = el.select('.fancy-field-text');

    radioEls.removeClass(checkedCls);

    el.select('[value='+value+']').addClass(checkedCls);

    me.value = value;
    if(fire !== false){
      me.fire('change', me.value);
    }
  },
  setValue: function(value, onInput){
    this.set(value, onInput);
  },
  getValue: function(){
    var me = this;

    return me.value;
  },
  get: function(){

    return this.getValue();
  },
  clear: function(){
    this.set(false);
  }
});
Fancy.Class(['Fancy.form.field.ReCaptcha', 'Fancy.ReCaptcha'], {
  traits: {
    classes: [
      Fancy.form.field.Trait
    ]
  },
  extend: Fancy.Widget,
  type: 'field.recaptcha',
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

    me.name = 'recaptcha';

    //me.ons();

    if( me.hidden ){
      me.el.css('display', 'none');
    }

    if( me.style ){
      me.el.css(me.style);
    }

    var s = document.createElement("script");

    s.type = "text/javascript";
    s.src = 'https://www.google.com/recaptcha/api.js';

    Fancy.get(document.head).append(s);
  },
  get: function(){
    var me = this,
      formReCaptchaEl = me.el.select('form');

    if( me.value ){
      return me.value;
    }

    me.value = 'wait';

    formReCaptchaEl.one('submit', function(e){
      e.preventDefault();
      me.value = $(this).serialize().replace('g-recaptcha-response=', '');
    });

    formReCaptchaEl.submit();

    return me.value;
  },
  cls: 'fancy fancy-field',
  value: '',
  width: 100,
  tpl: [
    '<form action="post.php" method="POST">',
      '<div class="g-recaptcha" data-sitekey="{key}"></div>',
    '</form>'
  ]
});