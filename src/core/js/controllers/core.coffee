angular.module('jos').controller 'CoreController', [
	'$scope', '$q',
	($scope, $q) ->
		$scope.$root.desktop =
			visible: true
		$scope.$root.app =
			open: (app) ->
				$scope.$root.desktop.visible = false
				app.open = true
]
