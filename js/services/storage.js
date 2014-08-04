(function() {
  angular.module('jos').factory('storage', [
    '$rootScope', '$q', function($rootScope, $q) {
      var baseUrl, personal, ps;
      ps = baidu.frontia.personalStorage;
      baseUrl = 'https://c.pcs.baidu.com/rest/2.0/pcs';
      personal = {
        upload: function(file, path, options) {
          var deferred, fd, params, url;
          deferred = $q.defer();
          options = options || {};
          params = $.param({
            method: 'upload',
            path: path,
            access_token: $rootScope.user.accessToken,
            ondup: options.ondup || 'newcopy'
          });
          url = "" + baseUrl + "/file?" + params;
          fd = new FormData();
          fd.append('file', new Blob([file]));
          $.ajax({
            method: 'post',
            url: url,
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            data: fd,
            success: function(entry) {
              return $rootScope.$apply(function() {
                return deferred.resolve(entry);
              });
            },
            error: function(error) {
              return $rootScope.$apply(function() {
                return deferred.reject(error);
              });
            }
          });
          return deferred.promise;
        },
        mkdir: function(path, options) {
          var deferred, opt;
          deferred = $q.defer();
          opt = angular.extend(options || {}, {
            success: function(entries) {
              return $rootScope.$apply(function() {
                return deferred.resolve(entries);
              });
            },
            error: function(error) {
              return $rootScope.$apply(function() {
                return deferred.reject(error);
              });
            }
          });
          ps.makeDir(path, opt);
          return deferred.promise;
        },
        list: function(path, options) {
          var deferred, opt;
          deferred = $q.defer();
          opt = angular.extend(options || {}, {
            success: function(entries) {
              return $rootScope.$apply(function() {
                return deferred.resolve(entries);
              });
            },
            error: function(error) {
              return $rootScope.$apply(function() {
                return deferred.reject(error);
              });
            }
          });
          ps.listFile(path, opt);
          return deferred.promise;
        },
        deleteFile: function(path, options) {
          var deferred, opt;
          deferred = $q.defer();
          console.log(path);
          opt = angular.extend(options || {}, {
            success: function(entry) {
              return $rootScope.$apply(function() {
                return deferred.resolve(entry);
              });
            },
            error: function(error) {
              return $rootScope.$apply(function() {
                return deferred.reject(error);
              });
            }
          });
          ps.deleteFile([path], opt);
          return deferred.promise;
        },
        getFileUrl: function(path, options) {
          var deferred, opt;
          deferred = $q.defer();
          opt = angular.extend(options || {}, {
            success: function(url) {
              return $rootScope.$apply(function() {
                return deferred.resolve(url);
              });
            },
            error: function(error) {
              return $rootScope.$apply(function() {
                return deferred.reject(error);
              });
            }
          });
          ps.getFileUrl(path, opt);
          return deferred.promise;
        }
      };
      return {
        personal: personal
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzXFxzdG9yYWdlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLEVBQUEsT0FBTyxDQUFDLE1BQVIsQ0FBZSxLQUFmLENBQXFCLENBQUMsT0FBdEIsQ0FBOEIsU0FBOUIsRUFBeUM7SUFDeEMsWUFEd0MsRUFDMUIsSUFEMEIsRUFFeEMsU0FBQyxVQUFELEVBQWEsRUFBYixHQUFBO0FBQ0MsVUFBQSxxQkFBQTtBQUFBLE1BQUEsRUFBQSxHQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBbkIsQ0FBQTtBQUFBLE1BQ0EsT0FBQSxHQUFVLHNDQURWLENBQUE7QUFBQSxNQUVBLFFBQUEsR0FDQztBQUFBLFFBQUEsTUFBQSxFQUFRLFNBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxPQUFiLEdBQUE7QUFDUCxjQUFBLHlCQUFBO0FBQUEsVUFBQSxRQUFBLEdBQVcsRUFBRSxDQUFDLEtBQUgsQ0FBQSxDQUFYLENBQUE7QUFBQSxVQUNBLE9BQUEsR0FBVSxPQUFBLElBQVcsRUFEckIsQ0FBQTtBQUFBLFVBRUEsTUFBQSxHQUFTLENBQUMsQ0FBQyxLQUFGLENBQ1I7QUFBQSxZQUFBLE1BQUEsRUFBUSxRQUFSO0FBQUEsWUFDQSxJQUFBLEVBQU0sSUFETjtBQUFBLFlBRUEsWUFBQSxFQUFjLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FGOUI7QUFBQSxZQUdBLEtBQUEsRUFBTyxPQUFPLENBQUMsS0FBUixJQUFpQixTQUh4QjtXQURRLENBRlQsQ0FBQTtBQUFBLFVBT0EsR0FBQSxHQUFNLEVBQUEsR0FBRSxPQUFGLEdBQVcsUUFBWCxHQUFrQixNQVB4QixDQUFBO0FBQUEsVUFRQSxFQUFBLEdBQVMsSUFBQSxRQUFBLENBQUEsQ0FSVCxDQUFBO0FBQUEsVUFTQSxFQUFFLENBQUMsTUFBSCxDQUFVLE1BQVYsRUFBc0IsSUFBQSxJQUFBLENBQUssQ0FBQyxJQUFELENBQUwsQ0FBdEIsQ0FUQSxDQUFBO0FBQUEsVUFVQSxDQUFDLENBQUMsSUFB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VUFBSCxDQUFjLElBQWQsRUFBb0IsR0FBcEIsQ0FSQSxDQUFBO2lCQVNBLFFBQVEsQ0FBQyxRQVZFO1FBQUEsQ0E1RFo7T0FIRCxDQUFBO2FBMEVBO0FBQUEsUUFBQSxRQUFBLEVBQVUsUUFBVjtRQTNFRDtJQUFBLENBRndDO0dBQXpDLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6InNlcnZpY2VzXFxzdG9yYWdlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2pvcycpLmZhY3RvcnkgJ3N0b3JhZ2UnLCBbXHJcblx0JyRyb290U2NvcGUnLCAnJHEnLFxyXG5cdCgkcm9vdFNjb3BlLCAkcSkgLT5cclxuXHRcdHBzID0gYmFpZHUuZnJvbnRpYS5wZXJzb25hbFN0b3JhZ2VcclxuXHRcdGJhc2VVcmwgPSAnaHR0cHM6Ly9jLnBjcy5iYWlkdS5jb20vcmVzdC8yLjAvcGNzJ1xyXG5cdFx0cGVyc29uYWwgPSBcclxuXHRcdFx0dXBsb2FkOiAoZmlsZSwgcGF0aCwgb3B0aW9ucykgLT5cclxuXHRcdFx0XHRkZWZlcnJlZCA9ICRxLmRlZmVyKClcclxuXHRcdFx0XHRvcHRpb25zID0gb3B0aW9ucyBvciB7fVxyXG5cdFx0XHRcdHBhcmFtcyA9ICQucGFyYW1cclxuXHRcdFx0XHRcdG1ldGhvZDogJ3VwbG9hZCdcclxuXHRcdFx0XHRcdHBhdGg6IHBhdGhcclxuXHRcdFx0XHRcdGFjY2Vzc190b2tlbjogJHJvb3RTY29wZS51c2VyLmFjY2Vzc1Rva2VuXHJcblx0XHRcdFx0XHRvbmR1cDogb3B0aW9ucy5vbmR1cCBvciAnbmV3Y29weSdcclxuXHRcdFx0XHR1cmwgPSBcIiN7YmFzZVVybH0vZmlsZT8je3BhcmFtc31cIlxyXG5cdFx0XHRcdGZkID0gbmV3IEZvcm1EYXRhKClcclxuXHRcdFx0XHRmZC5hcHBlbmQgJ2ZpbGUnLCBuZXcgQmxvYiBbZmlsZV1cclxuXHRcdFx0XHQkLmFqYXhcclxuXHRcdFx0XHRcdG1ldGhvZDogJ3Bvc3QnXHJcblx0XHRcdFx0XHR1cmw6IHVybFxyXG5cdFx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJ1xyXG5cdFx0XHRcdFx0Y29udGVudFR5cGU6IGZhbHNlXHJcblx0XHRcdFx0XHRjYWNoZTogZmFsc2VcclxuXHRcdFx0XHRcdHByb2Nlc3NEYXRhOiBmYWxzZVxyXG5cdFx0XHRcdFx0ZGF0YTogZmRcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChlbnRyeSkgLT5cclxuXHRcdFx0XHRcdFx0JHJvb3RTY29wZS4kYXBwbHkgLT5cclxuXHRcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlIGVudHJ5XHJcblx0XHRcdFx0XHRlcnJvcjogKGVycm9yKSAtPlxyXG5cdFx0XHRcdFx0XHQkcm9vdFNjb3BlLiRhcHBseSAtPlxyXG5cdFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdCBlcnJvclxyXG5cdFx0XHRcdGRlZmVycmVkLnByb21pc2VcclxuXHRcdFx0bWtkaXI6IChwYXRoLCBvcHRpb25zKSAtPlxyXG5cdFx0XHRcdGRlZmVycmVkID0gJHEuZGVmZXIoKVxyXG5cdFx0XHRcdG9wdCA9IGFuZ3VsYXIuZXh0ZW5kIG9wdGlvbnMgb3Ige30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZW50cmllcykgLT5cclxuXHRcdFx0XHRcdFx0JHJvb3RTY29wZS4kYXBwbHkgLT5cclxuXHRcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlIGVudHJpZXNcclxuXHRcdFx0XHRcdGVycm9yOiAoZXJyb3IpIC0+XHJcblx0XHRcdFx0XHRcdCRyb290U2NvcGUuJGFwcGx5IC0+XHJcblx0XHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0IGVycm9yXHJcblx0XHRcdFx0cHMubWFrZURpciBwYXRoLCBvcHRcclxuXHRcdFx0XHRkZWZlcnJlZC5wcm9taXNlXHJcblx0XHRcdGxpc3Q6IChwYXRoLCBvcHRpb25zKSAtPlxyXG5cdFx0XHRcdGRlZmVycmVkID0gJHEuZGVmZXIoKVxyXG5cdFx0XHRcdG9wdCA9IGFuZ3VsYXIuZXh0ZW5kIG9wdGlvbnMgb3Ige30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZW50cmllcykgLT5cclxuXHRcdFx0XHRcdFx0JHJvb3RTY29wZS4kYXBwbHkgLT5cclxuXHRcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlIGVudHJpZXNcclxuXHRcdFx0XHRcdGVycm9yOiAoZXJyb3IpIC0+XHJcblx0XHRcdFx0XHRcdCRyb290U2NvcGUuJGFwcGx5IC0+XHJcblx0XHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0IGVycm9yXHJcblx0XHRcdFx0cHMubGlzdEZpbGUgcGF0aCwgb3B0XHJcblx0XHRcdFx0ZGVmZXJyZWQucHJvbWlzZVxyXG5cdFx0XHRkZWxldGVGaWxlOiAocGF0aCwgb3B0aW9ucykgLT5cclxuXHRcdFx0XHRkZWZlcnJlZCA9ICRxLmRlZmVyKClcclxuXHRcdFx0XHRjb25zb2xlLmxvZyBwYXRoXHJcblx0XHRcdFx0b3B0ID0gYW5ndWxhci5leHRlbmQgb3B0aW9ucyBvciB7fSxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChlbnRyeSkgLT5cclxuXHRcdFx0XHRcdFx0JHJvb3RTY29wZS4kYXBwbHkgLT5cclxuXHRcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlIGVudHJ5XHJcblx0XHRcdFx0XHRlcnJvcjogKGVycm9yKSAtPlxyXG5cdFx0XHRcdFx0XHQkcm9vdFNjb3BlLiRhcHBseSAtPlxyXG5cdFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdCBlcnJvclxyXG5cdFx0XHRcdHBzLmRlbGV0ZUZpbGUgW3BhdGhdLCBvcHRcclxuXHRcdFx0XHRkZWZlcnJlZC5wcm9taXNlXHJcblx0XHRcdGdldEZpbGVVcmw6IChwYXRoLCBvcHRpb25zKSAtPlxyXG5cdFx0XHRcdGRlZmVycmVkID0gJHEuZGVmZXIoKVxyXG5cdFx0XHRcdG9wdCA9IGFuZ3VsYXIuZXh0ZW5kIG9wdGlvbnMgb3Ige30sXHJcblx0XHRcdFx0XHRzdWNjZXNzOiAodXJsKSAtPlxyXG5cdFx0XHRcdFx0XHQkcm9vdFNjb3BlLiRhcHBseSAtPlxyXG5cdFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUgdXJsXHJcblx0XHRcdFx0XHRlcnJvcjogKGVycm9yKSAtPlxyXG5cdFx0XHRcdFx0XHQkcm9vdFNjb3BlLiRhcHBseSAtPlxyXG5cdFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdCBlcnJvclxyXG5cdFx0XHRcdHBzLmdldEZpbGVVcmwgcGF0aCwgb3B0XHJcblx0XHRcdFx0ZGVmZXJyZWQucHJvbWlzZVxyXG5cdFx0cGVyc29uYWw6IHBlcnNvbmFsXHJcbl0iXX0=