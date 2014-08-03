jos = angular.module 'jos', ['jos']
jos.config [
		'$controllerProvider', 
		'$compileProvider', 
		'$filterProvider', 
		'$provide', 
		($controllerProvider,
			$compileProvider,
			$filterProvider,
			$provide) ->

			jos.controller = $controllerProvider.register
			jos.service = $provide.service
			jos.factory = $provide.factory
			jos.filter = $filterProvider.register
			jos.directive = $compileProvider.directive
	]
	.run [
		'$rootScope',
		($rootScope) ->
			$rootScope.settings = window.settings
			$rootScope.extensions = window.extensions
	]

window.extensions = []
window.reg = (ext) ->
	window.extensions.push ext

$ ->
	$.ajax
			url: 'settings.json'
			dataType: 'json'
		.then (settings) ->
			window.settings = settings
			angular.bootstrap document, ['jos']

