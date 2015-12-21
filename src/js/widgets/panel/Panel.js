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