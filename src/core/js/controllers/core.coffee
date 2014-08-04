angular.module('jos').controller 'CoreController', [
	'$scope', '$q',
	($scope, $q) ->
		$scope.$root.desktop =
			visible: true
		$scope.$root.app =
			activated: null
			open: (app) ->
				$scope.$root.desktop.visible = false
				$scope.$root.app.activated = app
				app.open = true
]
