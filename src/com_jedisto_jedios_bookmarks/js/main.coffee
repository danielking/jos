APP_NAME = 'com_jedisto_jedios_bookmarks'
APP_TITLE = 'Bookmarks'

angular.module APP_NAME, ['common']

angular.module(APP_NAME).run ['common.message', (message) ->
]

$(document).trigger 'app_reg', name: APP_NAME, title: APP_TITLE, genre: 'angular'
