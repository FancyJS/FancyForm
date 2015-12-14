Fancy.Class(['Fancy.form.field.Chat', 'Fancy.Chat'], {
  traits: {
    classes: [
      Fancy.form.field.Trait
    ]
  },
  extend: Fancy.Widget,
  type: 'field.chat',
  constructor: function(){
    var me = this;

    me.Super('const', arguments);
  },
  init: function(){
    var me = this;

    me.addEvents('focus', 'blur', 'input', 'up', 'down', 'change', 'key');
    me.Super('init', arguments);

    setTimeout(function(){
      me.initHeight();
    });

    me.initStore();

    me.tpl = new Fancy.Template(me.tpl);
    me.render();

    me.ons();
  },
  //cls: 'fancy fancy-field fancy-textarea',
  cls: 'fancy fancy-field fancy-chat-field',
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

  ],
  ons: function(){
    var me = this;

    me.store.on('add', me.onAdd, me);
  },
  initHeight: function(){
    var me = this,
      height = me.height;

    me.el.css('height', height + 'px');
  },
  initStore: function(){
    var me = this;

    Fancy.Class('Fancy.model.Message', {
      extend: 'Fancy.Model',
      fields: ['text', 'time', 'name']
    });

    me.store = new Fancy.Store({
      model: 'Fancy.model.Message'
    });
  },
  add: function(o){
    var me = this;

    me.store.add(o);
  },
  onAdd: function(store, value){
    var me = this,
      tplClient = new Fancy.Template([
        '<div class="fancy-chat-message-client">',
          '<div class="fancy-chart-name">You</div>',
          '{text}',
          '<div class="fancy-chat-time">',
            '{time}',
          '</div>',
        '</div>'
      ]),
      tplManager = new Fancy.Template([
        '<div class="fancy-chat-message-manager">',
          '<div class="fancy-chart-name">Support</div>',
          '{text}',
          '<div class="fancy-chat-time">',
            '{time}',
          '</div>',
        '</div>'

      ]),
      rand = Math.round( Math.random() );

    var time = new Date(value.time),
      isToday = new Date().toDateString() === time.toDateString();

    if( isToday ){
      var minutes = time.getMinutes(),
        hours = time.getHours();

      if( minutes < 10 ){
        minutes = '0' + minutes;
      }

      value.time = time.getHours() + ':' + minutes;

    }
    else{
      value.time = time.getMonth() + '.' + time.getDate() + '.' + time.getFullYear();
    }

    if( rand === 0 ){
      me.el.append(tplManager.getHTML(value));
    }
    else{
      me.el.append(tplClient.getHTML(value));
    }

    me.checkScroll();
  },
  checkScroll: function(){
    var me = this;

    if( me.el.dom.scrollHeight > me.el.dom.clientHeight ){
      me.el.css('overflow-y', 'scroll');
    }
  }
});