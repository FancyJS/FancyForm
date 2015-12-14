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