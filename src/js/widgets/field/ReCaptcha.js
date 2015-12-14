Fancy.Class(['Fancy.form.field.ReCaptcha', 'Fancy.ReCaptcha'], {
  traits: {
    classes: [
      Fancy.form.field.Trait
    ]
  },
  extend: Fancy.Widget,
  type: 'field.recaptcha',
  constructor: function(config){
    var me = this,
      config = config || {};

    Fancy.apply(me, config);

    me.Super('const', arguments);
  },
  init: function(){
    var me = this;

    me.addEvents('focus', 'blur', 'input', 'enter', 'up', 'down', 'change', 'key');

    me.Super('init', arguments);

    me.tpl = new Fancy.Template(me.tpl);
    me.render();

    me.name = 'recaptcha';

    //me.ons();

    if( me.hidden ){
      me.el.css('display', 'none');
    }

    if( me.style ){
      me.el.css(me.style);
    }

    var s = document.createElement("script");

    s.type = "text/javascript";
    s.src = 'https://www.google.com/recaptcha/api.js';

    Fancy.get(document.head).append(s);
  },
  get: function(){
    var me = this,
      formReCaptchaEl = me.el.select('form');

    if( me.value ){
      return me.value;
    }

    me.value = 'wait';

    formReCaptchaEl.one('submit', function(e){
      e.preventDefault();
      me.value = $(this).serialize().replace('g-recaptcha-response=', '');
    });

    formReCaptchaEl.submit();

    return me.value;
  },
  cls: 'fancy fancy-field',
  value: '',
  width: 100,
  tpl: [
    '<form action="post.php" method="POST">',
      '<div class="g-recaptcha" data-sitekey="{key}"></div>',
    '</form>'
  ]
});