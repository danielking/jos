(function() {
  angular.module('jos').controller('CoreController', [
    '$scope', '$q', function($scope, $q) {
      $scope.$root.desktop = {
        visible: true
      };
      return $scope.$root.app = {
        activated: null,
        open: function(app) {
          $scope.$root.desktop.visible = false;
          $scope.$root.app.activated = app;
          return app.open = true;
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzXFxjb3JlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLEVBQUEsT0FBTyxDQUFDLE1BQVIsQ0FBZSxLQUFmLENBQXFCLENBQUMsVUFBdEIsQ0FBaUMsZ0JBQWpDLEVBQW1EO0lBQ2xELFFBRGtELEVBQ3hDLElBRHdDLEVBRWxELFNBQUMsTUFBRCxFQUFTLEVBQVQsR0FBQTtBQUNDLE1BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFiLEdBQ0M7QUFBQSxRQUFBLE9BQUEsRUFBUyxJQUFUO09BREQsQ0FBQTthQUVBLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBYixHQUNDO0FBQUEsUUFBQSxTQUFBLEVBQVcsSUFBWDtBQUFBLFFBQ0EsSUFBQSxFQUFNLFNBQUMsR0FBRCxHQUFBO0FBQ0wsVUFBQSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFyQixHQUErQixLQUEvQixDQUFBO0FBQUEsVUFDQSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFqQixHQUE2QixHQUQ3QixDQUFBO2lCQUVBLEdBQUcsQ0FBQyxJQUFKLEdBQVcsS0FITjtRQUFBLENBRE47UUFKRjtJQUFBLENBRmtEO0dBQW5ELENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNvbnRyb2xsZXJzXFxjb3JlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2pvcycpLmNvbnRyb2xsZXIgJ0NvcmVDb250cm9sbGVyJywgW1xyXG5cdCckc2NvcGUnLCAnJHEnLFxyXG5cdCgkc2NvcGUsICRxKSAtPlxyXG5cdFx0JHNjb3BlLiRyb290LmRlc2t0b3AgPVxyXG5cdFx0XHR2aXNpYmxlOiB0cnVlXHJcblx0XHQkc2NvcGUuJHJvb3QuYXBwID1cclxuXHRcdFx0YWN0aXZhdGVkOiBudWxsXHJcblx0XHRcdG9wZW46IChhcHApIC0+XHJcblx0XHRcdFx0JHNjb3BlLiRyb290LmRlc2t0b3AudmlzaWJsZSA9IGZhbHNlXHJcblx0XHRcdFx0JHNjb3BlLiRyb290LmFwcC5hY3RpdmF0ZWQgPSBhcHBcclxuXHRcdFx0XHRhcHAub3BlbiA9IHRydWVcclxuXVxyXG4iXX0=