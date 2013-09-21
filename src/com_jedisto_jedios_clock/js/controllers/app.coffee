angular.module(APP_NAME).controller 'AppController', ['$scope', '$rootScope', ($scope, $rootScope) ->
  $scope.app_name = APP_NAME
  console.log 'clock', $rootScope
]