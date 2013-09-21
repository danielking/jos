angular.module('core').directive 'coreNavbar', ['$templateCache' , ($templateCache) ->
	template: $templateCache.get('navbar.html')
	replace: true
	link: (scope, element, attrs) ->
]
