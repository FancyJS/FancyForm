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