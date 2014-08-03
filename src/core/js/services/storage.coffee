angular.module('jos').factory 'storage', [
	'$rootScope', '$q',
	($rootScope, $q) ->
		root = '/apps/jedios'
		ps = baidu.frontia.personalStorage
		personal = 
			mkdir: (path, options) ->
				deferred = $q.defer()
				opt = angular.extend options or {},
					success: (entries) ->
						$rootScope.$apply ->
							deferred.resolve entries
					error: (error) ->
						$rootScope.$apply ->
							deferred.reject error
				ps.makeDir root + path, opt
				deferred.promise
			list: (path, options) ->
				deferred = $q.defer()
				opt = angular.extend options or {},
					success: (entries) ->
						$rootScope.$apply ->
							deferred.resolve entries
					error: (error) ->
						$rootScope.$apply ->
							deferred.resolve error
				ps.listFile root + path, opt
				deferred.promise

		personal: personal
]