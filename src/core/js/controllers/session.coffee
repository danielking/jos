jos = angular.module 'jos'
jos.controller 'SessionController', [
	'$scope',
	($scope) ->
		apikey = '39zfXGjOxb0RfRhdOoFrXh08'
		baidu.frontia.init apikey
		baidu.frontia.social.setLoginCallback
			success: (user) ->
				$scope.$apply ->
					$scope.$root.user =
						name: user.getName()
						mediaType: user.getMediaType()
			error: (error) ->
				console.log error
				$scope.$root.user = null

		init = ->
			user = baidu.frontia.getCurrentAccount()

			if !user or user.getType() != 'user'
			else
				$scope.$root.user =
					name: user.getName()
					mediaType: user.getMediaType()

		$scope.$root.user = null

		$scope.login = (mediaType) ->
			options =
				response_type: 'token'
				media_type: mediaType || 'baidu'
				redirect_uri: if window.location.hostname = '127.0.0.1'
						'http://127.0.0.1:7890/debug'
					else
						'http://jos.jedisto.com'
				client_type: 'web'
				scope: 'netdisk'
			baidu.frontia.social.login options

		$scope.$root.logout = ->
			bootbox.confirm 'Confirmed to logout?', (confirmed) ->
				if confirmed
					$scope.$apply ->
						window.location = '#'
						baidu.frontia.logOutCurrentAccount()
						$scope.$root.user = null

		$scope.list = ->
			baidu.frontia.personalStorage.listFile '/apps/jedios/',
				success: (data) ->
					console.log data
				error: (error) ->
					console.log error

		$scope.test = ->
			baidu.frontia.personalStorage.makeDir '/apps/jedios/hello',
				success: (data) ->
					console.log data
				error: (error) ->
					console.log error

		init()
]