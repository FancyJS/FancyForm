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