APP_NAME = 'com_jedisto_jedios_timer'
APP_TITLE = 'Timer'

angular.module APP_NAME, []

angular.module(APP_NAME).config () ->
  console.log 11

angular.module(APP_NAME).run ['$rootScope', ($rootScope) ->
  console.log 1111
]

$(document).trigger 'app_reg', name: APP_NAME, title: APP_TITLE, genre: 'angular'
