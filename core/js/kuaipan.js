(function() {
  window.kuaipan = (function() {
    var KUAIPAN_ACCESS_TOKEN_URL, KUAIPAN_AUTHORISE_URL, KUAIPAN_CONSUMER_KEY, KUAIPAN_CONSUMER_SECRET, KUAIPAN_REQUEST_TOKEN_URL, get_access_token, get_temp_token;
    KUAIPAN_CONSUMER_KEY = 'xcBabQ2lWkHKMxq5';
    KUAIPAN_CONSUMER_SECRET = '568VCLaz1GarThGU';
    KUAIPAN_REQUEST_TOKEN_URL = 'https://openapi.kuaipan.cn/open/requestToken';
    KUAIPAN_ACCESS_TOKEN_URL = 'https://openapi.kuaipan.cn/open/accessToken';
    KUAIPAN_AUTHORISE_URL = 'https://www.kuaipan.cn/api.php?ac=open&op=authorise&oauth_token=';
    get_temp_token = function() {
      return async.waterfall([
        function(cb) {
          var message, signcode, url;
          message = {
            method: 'GET',
            action: KUAIPAN_REQUEST_TOKEN_URL,
            parameters: []
          };
          while (true) {
            message.parameters = [['oauth_version', '1.0'], ['oauth_callback', "http://" + window.location.host + "/kuaipan.html?callback"], ['oauth_timestamp', OAuth.timestamp()], ['oauth_nonce', encodeURIComponent(OAuth.nonce(6))], ['oauth_signature_method', 'HMAC-SHA1'], ['oauth_consumer_key', KUAIPAN_CONSUMER_KEY]];
            OAuth.SignatureMethod.sign(message, {
              consumerSecret: KUAIPAN_CONSUMER_SECRET
            });
            signcode = OAuth.getParameter(message.parameters, 'oauth_signature');
            if (signcode.indexOf('+') === -1) {
              break;
            }
          }
          url = message.action + '?' + OAuth.SignatureMethod.normalizeParameters(message.parameters).replace(/oauth_signature/, 'oauth_signature=' + OAuth.getParameter(message.parameters, 'oauth_signature') + '&oauth_signature');
          return $.ajax({
            url: 'http://localhost:4040/',
            data: {
              url: url,
              method: 'get'
            },
            dataType: 'jsonp'
          }).success(function(res) {
            var token;
            token = JSON.parse(res);
            localStorage.kuaipan_oauth_token_secret = token.oauth_token_secret;
            return cb(null, token);
          });
        }, function(token, cb) {
          var url, win;
          url = KUAIPAN_AUTHORISE_URL + token.oauth_token;
          return win = window.open(url);
        }
      ], function(err, result) {});
    };
    get_access_token = function(temp_token, oauth_verifier) {
      var message, signcode, url;
      message = {
        method: 'GET',
        action: KUAIPAN_ACCESS_TOKEN_URL,
        parameters: []
      };
      while (true) {
        message.parameters = [['oauth_consumer_key', KUAIPAN_CONSUMER_KEY], ['oauth_nonce', encodeURIComponent(OAuth.nonce(6))], ['oauth_signature_method', 'HMAC-SHA1'], ['oauth_timestamp', OAuth.timestamp()], ['oauth_token', temp_token], ['oauth_version', '1.0']];
        OAuth.SignatureMethod.sign(message, {
          consumerSecret: KUAIPAN_CONSUMER_SECRET
        });
        signcode = OAuth.getParameter(message.parameters, 'oauth_signature');
        if (signcode.indexOf('+') === -1) {
          break;
        }
      }
      url = message.action + '?' + OAuth.SignatureMethod.normalizeParameters(message.parameters).replace(/oauth_signature/, 'oauth_signature=' + OAuth.getParameter(message.parameters, 'oauth_signature') + '&oauth_signature');
      return $.ajax({
        url: 'http://localhost:4040/',
        data: {
          url: url,
          method: 'get'
        },
        dataType: 'jsonp'
      }).success(function(res) {
        var data;
        data = JSON.parse(res);
        return console.log(data);
      });
    };
    return {
      get_temp_token: get_temp_token,
      get_access_token: get_access_token
    };
  })();

  $(function() {
    var query;
    if (window.location.search.indexOf('?callback') === 0) {
      query = $.url().param();
      localStorage.kuaipan_oauth_verifier = query.oauth_verifier;
      localStorage.kuaipan_oauth_token = query.oauth_token;
      return kuaipan.get_access_token(query.oauth_token, query.oauth_verifier);
    } else {
      return kuaipan.get_temp_token();
    }
  });

}).call(this);

/*
//@ sourceMappingURL=kuaipan.js.map
*/