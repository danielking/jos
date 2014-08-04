angular.module('jos').factory 'storage', [
	'$rootScope', '$q',
	($rootScope, $q) ->
		ps = baidu.frontia.personalStorage
		baseUrl = 'https://c.pcs.baidu.com/rest/2.0/pcs'
		personal = 
			upload: (file, path, options) ->
				deferred = $q.defer()
				options = options or {}
				params = $.param
					method: 'upload'
					path: path
					access_token: $rootScope.user.accessToken
					ondup: options.ondup or 'newcopy'
				url = "#{baseUrl}/file?#{params}"
				fd = new FormData()
				fd.append 'file', new Blob [file]
				$.ajax
					method: 'post'
					url: url
					dataType: 'json'
					contentType: false
					cache: false
					processData: false
					data: fd
					success: (entry) ->
						$rootScope.$apply ->
							deferred.resolve entry
					error: (error) ->
						$rootScope.$apply ->
							deferred.reject error
				deferred.promise
			mkdir: (path, options) ->
				deferred = $q.defer()
				opt = angular.extend options or {},
					success: (entries) ->
						$rootScope.$apply ->
							deferred.resolve entries
					error: (error) ->
						$rootScope.$apply ->
							deferred.reject error
				ps.makeDir path, opt
				deferred.promise
			list: (path, options) ->
				deferred = $q.defer()
				opt = angular.extend options or {},
					success: (entries) ->
						$rootScope.$apply ->
							deferred.resolve entries
					error: (error) ->
						$rootScope.$apply ->
							deferred.reject error
				ps.listFile path, opt
				deferred.promise
			deleteFile: (path, options) ->
				deferred = $q.defer()
				console.log path
				opt = angular.extend options or {},
					success: (entry) ->
						$rootScope.$apply ->
							deferred.resolve entry
					error: (error) ->
						$rootScope.$apply ->
							deferred.reject error
				ps.deleteFile [path], opt
				deferred.promise
			getFileUrl: (path, options) ->
				deferred = $q.defer()
				opt = angular.extend options or {},
					success: (url) ->
						$rootScope.$apply ->
							deferred.resolve url
					error: (error) ->
						$rootScope.$apply ->
							deferred.reject error
				ps.getFileUrl path, opt
				deferred.promise
		personal: personal
]