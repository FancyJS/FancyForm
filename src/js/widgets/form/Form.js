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
      tools: config.tools || undefined
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
            console.log('collapsed');
          });

          item.on('expanded', function(){
            console.log('expanded');
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