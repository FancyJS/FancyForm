(function(){
  var dc = 1,
    pathToSrc = '/src/js/',
    files = [
      pathToSrc + 'core/Fancy.js',
      pathToSrc + 'util/Collection.js',
      pathToSrc + 'util/Template.js',
      pathToSrc + 'util/Key.js',
      pathToSrc + 'core/Class.js',
      pathToSrc + 'core/TraitClass.js',
      pathToSrc + 'data/Data.js',
      pathToSrc + 'data/Model.js',
      pathToSrc + 'widgets/PluginManager.js',
      pathToSrc + 'widgets/WidgetManager.js',
      pathToSrc + 'util/Event.js',
      pathToSrc + 'data/Store.js',

      pathToSrc + 'adapter/jquery.js',

      pathToSrc + 'widgets/Widget.js',
      pathToSrc + 'widgets/button/Button.js',
      pathToSrc + 'widgets/tab/Tab.js',
      pathToSrc + 'widgets/panel/Panel.js',
      pathToSrc + 'widgets/panel/Tool.js',

      pathToSrc + 'widgets/form/Form.js',
      pathToSrc + 'widgets/field/Trait.js',
      pathToSrc + 'widgets/field/String.js',
      pathToSrc + 'widgets/field/Number.js',
      pathToSrc + 'widgets/field/TextArea.js',
      pathToSrc + 'widgets/field/CheckBox.js',
      pathToSrc + 'widgets/field/Combo.js',
      pathToSrc + 'widgets/field/Line.js',
      pathToSrc + 'widgets/field/Set.js',
      pathToSrc + 'widgets/field/Tab.js',
      pathToSrc + 'widgets/field/HTML.js',
      pathToSrc + 'widgets/field/Radio.js',
      pathToSrc + 'widgets/field/ReCaptcha.js'
    ],
    i = 0,
    iL = files.length,
    dcUrl = '?_dc='+dc;

  for(;i<iL;i++){
    var file = files[i] + dcUrl;
    document.write('<script type="text/javascript" charset="UTF-8" src="' + file + '"></script>');
  }

})();