angular.module('jos').controller 'com.jedisto.jos.app.notebook.MainController', [
	'$scope', '$filter', 'storage',
	($scope, $filter, storage) ->
		path = '/apps/jedios/com.jedisto.jos.app.notebook'
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
								cb null, null
							else
								$scope.loading = false
								console.log error
			list: ['mkdir', (cb, result) ->
				if result.mkdir
					$scope.notes = []
					$scope.loading = false
				else
					storage.personal.list path
						.then (entries) ->
								$scope.loading = false
								$scope.notes = entries.list
							, (error) ->
								$scope.loading = false
								console.log error
			]
		$scope.note = 
			new: ->
				return if $scope.note.editing
				content = $filter('date') new Date(), '笔记 @ yyyy-MM-dd hh:mm:ss'
				storage.personal.upload content, path + '/note'
					.then (entry) ->
							$scope.notes = [entry].concat $scope.notes
							$scope.note.open entry
						, (error) ->
							console.log error
			edit: ->
				$scope.note.editing_origin_content = $scope.note.selected.content
				$scope.note.editing = true
			cancel: ->
				$scope.note.selected.content = $scope.note.editing_origin_content
				$scope.note.editing = false
			delete: ->
				bootbox.confirm '确定删除?', (ok) ->
					if ok
						storage.personal.deleteFile $scope.note.selected.path
							.then (entry) ->
									console.log entry
									idx = $scope.notes.indexOf $scope.note.selected
									$scope.notes = $scope.notes.slice(0, idx).concat $scope.notes.slice(idx + 1)
									$scope.note.selected = null
									$scope.note.editing = false
								, (error) ->
									console.log error
			save: ->
				storage.personal.upload $scope.note.selected.content, $scope.note.selected.path, ondup: 'overwrite'
					.then (entry) ->
						for k, v of entry
							$scope.note.selected[k] = v
						$scope.note.editing = null
			open: (note) ->
				return if $scope.note.editing
				if $scope.note.selected == note
					$scope.note.selected = null
				else
					$scope.note.selected = note
					note.created_at = new Date(note.ctime * 1000)
					note.updated_at = new Date(note.mtime * 1000)
					unless note.loaded
						storage.personal.getFileUrl note.path
							.then (url) ->
								note.url = url
								$.ajax
									url: url
									dataType: 'text'
									success: (content) ->
										$scope.$apply ->
											note.content = content
											note.loaded = true
]
