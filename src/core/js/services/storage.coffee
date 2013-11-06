angular.module('common').service 'common.storage', ['$rootScope', ($rootScope) ->
  
  CLIENT_ID = '413758671312.apps.googleusercontent.com'

  hello.on 'auth.login', (auth) ->
    hello(auth.network).api('/me').success (user) ->
      console.log user
      $rootScope.$apply ->
        $rootScope.$user = user

  hello.init google: CLIENT_ID, {
    redirect_uri: 'authcb.html',
    scope: 'drive'
  }

  signIn: ->
    hello('google').login()

  signOut: ->
    hello('google').logout ->
      $rootScope.$apply ->
        $rootScope.$user = null

]

