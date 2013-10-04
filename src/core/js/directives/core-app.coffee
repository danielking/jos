angular.module('core').directive 'coreApp', ['common.message', '$http', (message, $http) ->
  link: (scope, element, attrs) ->
    scope.$watch 'app.actived', (cur, prev) ->
      if cur and !prev
        message.publish 'app', app_name: scope.app.name, event: 'actived'
      if cur and !scope.app.loaded
        $http.get("#{scope.app.name}/index.html").success((data) ->
            appBox = $('<div/>').appendTo element
            appBox.html data
            angular.bootstrap appBox, [scope.app.name]
            scope.app.loaded = true
            message.publish 'app', app_name: scope.app.name, event: 'loaded'
          ).error(-> )
]
