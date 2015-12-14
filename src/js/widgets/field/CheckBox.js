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