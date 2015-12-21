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