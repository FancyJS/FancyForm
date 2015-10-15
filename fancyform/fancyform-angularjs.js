(function(){
    'use strict';
	angular.module('fancyform-angularjs', []).directive('fancyform', function($compile){
    	return {
			restrict: 'EA',
			scope: {
				"config": '='
			},
			link: function(scope, element, attrs){
				$('#'+attrs.id).FancyForm(scope.config);
			}
		}
	});
})();