angular.module('core').service 'apps', ['$http', '$rootScope', '$window', ($http, $rootScope, $window) ->
  loadJs = (js) ->
    # console.log js
    eval js

  loadCss = (css) ->
    console.log css

  $(document).on 'app_reg', (evt, app) ->
    $rootScope.$$apps = $rootScope.$$apps or []
    $rootScope.$$apps.push app

  load: ->
    $http.get('settings.json').success (data) ->
      $rootScope.$$settings = data
      
      async.eachSeries data.apps, (app, cb) ->
            async.waterfall [
                (_cb) ->
                  $http.get("#{app}/js/main.js").success (data) ->
                    loadJs data
                    _cb null
                ,
                (_cb) ->
                  $http.get("#{app}/js/templates.js").success (data) ->
                    loadJs data
                    _cb null
                ,
                (_cb) ->
                  $http.get("#{app}/css/main.css").success (data) ->
                    loadCss data
                    _cb null
                ,
                (_cb) ->
                  $rootScope.$broadcast 'app_loaded', app
                  _cb null
              ], (err) ->
                cb()
        , (err) ->
          $rootScope.$broadcast 'app_loaded_all'

  active: (app) ->
    appViewport = $("##{app.name}")
    if appViewport.length == 0
      $http.get("#{app.name}/index.html").success((data) ->
          $('#apps > .app').hide()
          appViewport = $('<div/>')
          appViewport.attr(id: app.name).addClass('app').append(data).appendTo $('#apps')
          angular.bootstrap appViewport, [app.name]
          for _app in $rootScope.$$apps
            _app.actived = _app == app
        ).error(-> )

    else if appViewport.length == 1
      $('#apps > .app').hide()
      appViewport.show()
      for _app in $rootScope.$$apps
        _app.actived = _app == app

]
