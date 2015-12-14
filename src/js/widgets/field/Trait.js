Fancy.ns('Fancy.form.field');
Fancy.form.field.Trait = function(){};

Fancy.form.field.Trait.prototype = {
  vtypes: {},
  ons: function(){
    var me = this,
      input = me.el.getByTag('input');

    me.input = input;
    input.on('blur', me.onBlur, me);
    input.on('focus', me.onFocus, me);
    input.on('input', me.onInput, me);
    input.on('keydown', me.onKeyDown, me);
    me.on('key', me.onKey, me);
  },
  prepareValid: function(){
    var me = this,
      valid = me.valid,
      vtypes = me.vtypes;

    if( valid && valid.type ){
      var type = vtypes[valid.type];

      if(!type){
        throw new Error('not right validation type - ' + valid.type);
      }
      Fancy.applyIf(me.valid, type);
    }
  },
  render: function(){
    var me = this,
      renderTo = me.renderTo || document.body,
      el = document.createElement('div');

    me.prepareValid();

    me.fire('beforerender');
    el.className = me.cls;

    var labelWidth = '',
      inputWidth = '',
      itemsHTML = '';

    if( me.itemsHTML ){
      itemsHTML = me.itemsHTML;
    }

    if( me.labelWidth ){
      labelWidth = 'width:' + me.labelWidth + 'px;';
    }

    if( me.inputWidth ){
      inputWidth = 'width:' + me.inputWidth + 'px;';
    }

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

    var labelDisplay = '',
      inputLabelDisplay = '',
      inputLabel = '',
      _labelWidth = me.labelWidth || 0;

    _labelWidth += 11;

    if( me.labelAlign === 'top' ){
      _labelWidth = 2;
    }

    if( me.label === false ){
      labelDisplay = 'display:none;';
    }

    if( !me.inputLabel ){
      inputLabelDisplay = 'display:none;';
    }
    else{
      inputLabel = me.inputLabel;
    }

    if( me.type === 'recaptcha' ){
      el.innerHTML = me.tpl.getHTML({
        key: me.key
      });
    }
    else{
      el.innerHTML = me.tpl.getHTML({
        labelWidth: labelWidth,
        label: label,
        labelDisplay: labelDisplay,
        inputLabelDisplay: inputLabelDisplay,
        inputLabel: inputLabel,
        emptyText: me.emptyText,
        inputWidth: inputWidth,
        value: me.value,
        height: me.height,
        itemsHTML: itemsHTML,
        errorTextStyle: 'margin-left: ' + ( _labelWidth ) + 'px;'
      });
    }

    me.el = renderTo.appendChild(el);
    me.el = Fancy.get(me.el);

    if( me.labelAlign === 'top' ){
      me.el.addClass('fancy-field-label-align-top');
      me.el.select('.fancy-field-text').css('float', 'none');
    }
    else if( me.labelAlign === 'right' ){
      //console.log('in 3');
      me.el.addClass('fancy-field-label-align-right');
      $(el).find('.fancy-field-label').insertAfter($(el).find('.fancy-field-text'));
      //me.el.select('.fancy-field-text').css('float', 'none');
    }
    else if(me.type !== 'radio'){
      //console.log(me.el);
      //me.el.select('.fancy-field-text').css('float', 'none');
    }

    me.acceptedValue = me.value;
    me.fire('afterrender');
    me.fire('render');

    if( me.type !== 'recaptcha' && me.type !== 'chat' ){
      setTimeout(function(){
        if( me.input ){
          if( me.input.dom.value.length === 0 ){
            if( me.prevColor === undefined ){
              me.prevColor = me.input.css('color');
            }

            me.input.css('color', 'grey');
          }
        }
      }, 1);
    }
  },
  onKeyDown: function(e){
    var me = this,
      keyCode = e.keyCode,
      key = Fancy.key;

    if( me.type === 'number' ){
      if( Fancy.Key.isNumControl(keyCode, e) === false ){
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    }

    switch(keyCode){
      case key.ENTER:
        me.fire('enter', me.getValue());
        if( me.type !== 'textarea' ){
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      case key.UP:
        if( me.type === 'number' ){
          var newValue = +me.get() + me.step;
          if( isNaN(newValue) ){
            newValue = me.min || 0;
          }
          if( me.max !== undefined && newValue > me.max ){
            newValue = me.max;
          }
          else if(newValue < me.min){
            newValue = me.min;
          }
          me.set(newValue);
        }
        me.fire('up', me.getValue());
        if( me.type !== 'textarea' ){
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      case key.DOWN:
        if( me.type === 'number' ){
          var newValue = +me.get() - me.step;
          if( isNaN(newValue) ){
            newValue = me.min || 0;
          }
          if( me.min !== undefined && newValue < me.min ){
            newValue = me.min;
          }
          else if(newValue > me.max){
            newValue = me.max;
          }
          me.set(newValue);
        }
        me.fire('up', me.getValue());
        if( me.type !== 'textarea' ){
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      case key.LEFT:
        break;
      case key.RIGHT:
        e.stopPropagation();
        break;
      default:
        setTimeout(function(){
          if( me.input ){
            if( me.input.dom.value.length === 0 ){
              if( me.prevColor === undefined ){
                me.prevColor = me.input.css('color');
              }

              me.input.css('color', 'grey');
            }
            else{
              if( me.prevColor ){
                me.input.css('color', me.prevColor);
              }
              else{
                me.input.css('color', ' ');
              }
            }
          }
        }, 1);
    }

    setTimeout(function(){
      me.fire('key', me.getValue());
    }, 1);
  },
  onKey: function(){
    var me = this,
      valid = me.valid;

    /*
      Fix IE bug
      default placehold color is not grey
    */

    if( valid && valid.type ){
      me.validate();
    }
  },
  onBlur: function(){
    var me = this,
      el = me.el,
      valid = me.valid,
      isValid = true;

    if( valid ){
      if( valid.blank === false && ((me.type==='combo' && me.get() === 0) || me.get().length === 0) ){
        el.addClass('fancy-field-blank-err');
        if( el.hasClass('fancy-field-not-valid') ){
          el.removeClass('fancy-field-not-valid');
          el.css('height', ( parseInt( el.css('height') ) - 6) + 'px');
        }
        if( valid.blankText ){
          el.css('height', ( parseInt( el.css('height') ) + 6) + 'px');
          el.select('.fancy-field-error')[0].innerHTML = valid.blankText;
        }
      }
      else if( valid.type ){
        me.validate();
      }
      else {
        el.removeClass('fancy-field-blank-err');
        el.removeClass('fancy-field-not-valid');
      }
    }

    if( el.hasClass('fancy-field-blank-err') ){
      isValid = false;
    }

    if( el.hasClass('fancy-field-not-valid') ){
      isValid = false;
    }

    me.fire('blur');
    return isValid;
  },
  onFocus: function(){
    var me = this,
      el = me.el;

    if( el.hasClass('fancy-field-blank-err') ){
      me.el.removeClass('fancy-field-blank-err');
      if( me.valid.blankText ){
        el.css('height', ( parseInt( el.css('height') ) - 6) + 'px');
      }
    }

    me.fire('focus');
  },
  onInput: function(){
    var me = this,
      input = me.input,
      value = me.getValue();

    me.acceptedValue = me.get();
    me.fire('input', value);
    me.fire('change', value);
  },
  get: function(){
    var me = this;

    return me.input.dom.value;
  },
  getValue: function(){
    return this.get();
  },
  set: function(value, onInput){
    var me = this;

    me.input.dom.value = value;
    if(onInput !== false){
      me.onInput();
    }
  },
  setValue: function(value, onInput){
    this.set(value, onInput);
  },
  clear: function(){
    this.set('');
  },
  validate: function(){
    var me = this,
      el = me.el,
      valid = me.valid,
      vtypes = me.vtypes,
      type = vtypes[valid.type];

    if(!type){
      throw new Error('not right validation type - ' + valid.type);
    }
    //console.log('in 2');
    var value = me.get(),
      hadNotValid = el.hasClass('fancy-field-not-valid');

    if( type.fn ){
      if( !type.fn(value) ){
        el.addClass('fancy-field-not-valid');
      }
      else{
        el.removeClass('fancy-field-not-valid');
      }
    }
    else if(type.re){
      if( !type.re.test(value) ){
        el.addClass('fancy-field-not-valid');
      }
      else{
        el.removeClass('fancy-field-not-valid');
      }
    }

    var nowHadNotValid = el.hasClass('fancy-field-not-valid');

    if( hadNotValid === false && nowHadNotValid === true ){
      if( valid.text ){
        el.css('height', ( parseInt( el.css('height') ) + 6) + 'px');
      }
    }

    if( hadNotValid === true && nowHadNotValid === false ){
      if( valid.text ){
        el.css('height', ( parseInt( el.css('height') ) - 6) + 'px');
      }
    }

    if( nowHadNotValid ){
      //console.log(valid.text);
      el.select('.fancy-field-error')[0].innerHTML = valid.text;
    }

    return nowHadNotValid;
  }
};

FancyForm.vtype({
  type: 'email',
  re: /^(")?(?:[^\."])(?:(?:[\.])?(?:[\w\-!#$%&'*+\/=?\^_`{|}~]))*\1@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/,
  text: 'Incorect email'
});