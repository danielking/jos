# angular.module 'common', []

# angular.module 'core', ['common']

# angular.module('core').run ['apps', '$rootScope', 'common.message', (apps, $rootScope, message) ->
#   $rootScope.$$page_title = 'jOS'
#   apps.load()
#   message.subscribe 'app'
# ]

# window.initUi = (el) ->
#   el = $(el)
#   el.find('.ui.dropdown').dropdown
#     debug: false

# $ ->
#   angular.bootstrap document, ['core']
#   initUi document

jos =
	id: '3269124'
	apikey: 'brZm6Sw5sXDNGDC3o2bNvenf'
	seckey: 'GZ2PovOMBTIWRjHjlVeF2CplS1v4CVmj'

redirect_url = window.location.href

baidu.frontia.init
	akiKey: jos.apikey

user = baidu.frontia.getCurrentAccount()
unless user
	options =
		response_type: 'token'
		media_type: 'baidu'
		redirect_uri: window.location.href
		client_type: 'web'
		scope: 'netdisk'
	baidu.frontia.social.login options

