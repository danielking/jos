angular.module('core').run(['$templateCache', function($templateCache) {

  $templateCache.put('desktop.html',
    ""
  );


  $templateCache.put('navbar.html',
    "<div class=\"ui small menu fixed\"><div class=\"item\"><i class=\"icon laptop\"></i><strong>jOS</strong></div><a ng-click=\"toggleDesktop()\" ng-class=\"{active: desktopActive}\" class=\"item\"><i class=\"icon home small\"></i>Home</a><a ng-repeat=\"app in $$apps | filter: {loaded: true}\" ng-class=\"{active: (app.actived &amp;&amp; !desktopActive)}\" ng-click=\"activeApp(app)\" class=\"item\"><i class=\"icon angle right\"></i>{{app.title}}</a><a ng-click=\"openSettingsDialog()\" class=\"item right\"><i class=\"icon settings small\"></i>Settings</a><a ng-click=\"signIn()\" ng-hide=\"$user\" class=\"item right\"><i class=\"icon sign in small\"></i>Sign in</a><div ng-click=\"\" ng-show=\"$user\" ng-mouseover=\"showUserPopup()\" ng-mouseout=\"hideUserPopup()\" class=\"item user right\"><a ng-click=\"\" ng-show=\"userPopupVisible\" class=\"popup\"><div><img ng-src=\"{{$user.thumbnail}}\"></div><div class=\"ui tiny buttons basic\"><div ng-click=\"signOut()\" class=\"ui button\"><i class=\"icon sign out small\"></i>Sign out</div></div></a><i class=\"icon user\"></i>{{$user.name}}</div></div>"
  );

}]);
