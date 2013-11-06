angular.module('core').directive 'coreNavbar', ['$templateCache', 'common.storage' , ($templateCache, storage) ->
	template: $templateCache.get('navbar.html')
	replace: true
	link: (scope, element, attrs) ->
    scope.signIn = ->
      storage.signIn()

    scope.signOut = ->
      storage.signOut()

    scope.showUserPopup = ->
      scope.userPopupVisible = true

    scope.hideUserPopup = ->
      scope.userPopupVisible = false
]
