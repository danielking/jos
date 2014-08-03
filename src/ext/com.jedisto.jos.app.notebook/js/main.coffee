angular.module('jos').controller 'com.jedisto.jos.app.notebook.MainController', [
	'$scope', 'storage',
	($scope, storage) ->
		path = '/com.jedisto.jos.app.notebook'
		$scope.notes = []
		$scope.loading = false

		async.auto
			mkdir: (cb) ->
				$scope.loading = true
				storage.personal.mkdir path
					.then ->
							cb null, true
						, (error) ->
							if error.code == 31061
								cb null
							else
								$scope.loading = false
								console.log error
			list: (cb, newDir) ->
				if newDir
					$scope.notes = []
					$scope.loading = false
				else
					storage.personal.list path
						.then (entries) ->
								$scope.loading = false
								$scope.notes = entries
							, (error) ->
								$scope.loading = false
								console.log error
]