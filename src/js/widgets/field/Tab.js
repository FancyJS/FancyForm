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