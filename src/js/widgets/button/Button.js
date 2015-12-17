/**
 * @class Fancy.Button
 * @extends Fancy.Event
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