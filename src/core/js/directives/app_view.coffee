angular.module('jos').directive 'appView', [
	'$compile'
	($compile) ->
		scope:
			app: '='
		link: (scope, element, attrs) ->
			scope.$watch 'app', (app) ->
					unless app.loaded
						async.auto
							js: (cb) ->
								$.getScript "ext/#{app.id}/main.js"
									.then (data) ->
										cb null
							css: (cb) ->
								$('<link/>').attr
										href: "ext/#{app.id}/main.css"
										rel: 'stylesheet'
									.appendTo 'head'
								cb null
							html: ['js', 'css', ->
								$.get "ext/#{app.id}/main.html"
									.then (data) ->
										scope.$apply ->
											element.html data
											$compile(element.contents()) scope
							]
				, true
]
