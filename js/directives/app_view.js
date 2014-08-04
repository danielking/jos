(function() {
  angular.module('jos').directive('appView', [
    '$compile', function($compile) {
      return {
        scope: {
          app: '='
        },
        link: function(scope, element, attrs) {
          return scope.$watch('app', function(app) {
            if (!app.loaded) {
              return async.auto({
                js: function(cb) {
                  return $.getScript("ext/" + app.id + "/main.js").then(function(data) {
                    return cb(null);
                  });
                },
                css: function(cb) {
                  $('<link/>').attr({
                    href: "ext/" + app.id + "/main.css",
                    rel: 'stylesheet'
                  }).appendTo('head');
                  return cb(null);
                },
                html: [
                  'js', 'css', function() {
                    return $.get("ext/" + app.id + "/main.html").then(function(data) {
                      return scope.$apply(function() {
                        element.html(data);
                        return $compile(element.contents())(scope);
                      });
                    });
                  }
                ]
              });
            }
          }, true);
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXNcXGFwcF92aWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLEVBQUEsT0FBTyxDQUFDLE1BQVIsQ0FBZSxLQUFmLENBQXFCLENBQUMsU0FBdEIsQ0FBZ0MsU0FBaEMsRUFBMkM7SUFDMUMsVUFEMEMsRUFFMUMsU0FBQyxRQUFELEdBQUE7YUFDQztBQUFBLFFBQUEsS0FBQSxFQUNDO0FBQUEsVUFBQSxHQUFBLEVBQUssR0FBTDtTQUREO0FBQUEsUUFFQSxJQUFBLEVBQU0sU0FBQyxLQUFELEVBQVEsT0FBUixFQUFpQixLQUFqQixHQUFBO2lCQUNMLEtBQUssQ0FBQyxNQUFOLENBQWEsS0FBYixFQUFvQixTQUFDLEdBQUQsR0FBQTtBQUNsQixZQUFBLElBQUEsQ0FBQSxHQUFVLENBQUMsTUFBWDtxQkFDQyxLQUFLLENBQUMsSUFBTixDQUNDO0FBQUEsZ0JBQUEsRUFBQSxFQUFJLFNBQUMsRUFBRCxHQUFBO3lCQUNILENBQUMsQ0FBQyxTQUFGLENBQWEsTUFBQSxHQUFLLEdBQUcsQ0FBQyxFQUFULEdBQWEsVUFBMUIsQ0FDQyxDQUFDLElBREYsQ0FDTyxTQUFDLElBQUQsR0FBQTsyQkFDTCxFQUFBLENBQUcsSUFBSCxFQURLO2tCQUFBLENBRFAsRUFERztnQkFBQSxDQUFKO0FBQUEsZ0JBSUEsR0FBQSxFQUFLLFNBQUMsRUFBRCxHQUFBO0FBQ0osa0JBQUEsQ0FBQSxDQUFFLFNBQUYsQ0FBWSxDQUFDLElBQWIsQ0FDRTtBQUFBLG9CQUFBLElBQUEsRUFBTyxNQUFBLEdBQUssR0FBRyxDQUFDLEVBQVQsR0FBYSxXQUFwQjtBQUFBLG9CQUNBLEdBQUEsRUFBSyxZQURMO21CQURGLENBR0MsQ0FBQyxRQUhGLENBR1csTUFIWCxDQUFBLENBQUE7eUJBSUEsRUFBQSxDQUFHLElBQUgsRUFMSTtnQkFBQSxDQUpMO0FBQUEsZ0JBVUEsSUFBQSxFQUFNO2tCQUFDLElBQUQsRUFBTyxLQUFQLEVBQWMsU0FBQSxHQUFBOzJCQUNuQixDQUFDLENBQUMsR0FBRixDQUFPLE1BQUEsR0FBSyxHQUFHLENBQUMsRUFBVCxHQUFhLFlBQXBCLENBQ0MsQ0FBQyxJQURGLENBQ08sU0FBQyxJQUFELEdBQUE7NkJBQ0wsS0FBSyxDQUFDLE1BQU4sQ0FBYSxTQUFBLEdBQUE7QUFDWix3QkFBQSxPQUFPLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBQSxDQUFBOytCQUNBLFFBQUEsQ0FBUyxPQUFPLENBQUMsUUFBUixDQUFBLENBQVQsQ0FBQSxDQUE2QixLQUE3QixFQUZZO3NCQUFBLENBQWIsRUFESztvQkFBQSxDQURQLEVBRG1CO2tCQUFBLENBQWQ7aUJBVk47ZUFERCxFQUREO2FBRGtCO1VBQUEsQ0FBcEIsRUFvQkcsSUFwQkgsRUFESztRQUFBLENBRk47UUFERDtJQUFBLENBRjBDO0dBQTNDLENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6ImRpcmVjdGl2ZXNcXGFwcF92aWV3LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2pvcycpLmRpcmVjdGl2ZSAnYXBwVmlldycsIFtcclxuXHQnJGNvbXBpbGUnXHJcblx0KCRjb21waWxlKSAtPlxyXG5cdFx0c2NvcGU6XHJcblx0XHRcdGFwcDogJz0nXHJcblx0XHRsaW5rOiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSAtPlxyXG5cdFx0XHRzY29wZS4kd2F0Y2ggJ2FwcCcsIChhcHApIC0+XHJcblx0XHRcdFx0XHR1bmxlc3MgYXBwLmxvYWRlZFxyXG5cdFx0XHRcdFx0XHRhc3luYy5hdXRvXHJcblx0XHRcdFx0XHRcdFx0anM6IChjYikgLT5cclxuXHRcdFx0XHRcdFx0XHRcdCQuZ2V0U2NyaXB0IFwiZXh0LyN7YXBwLmlkfS9tYWluLmpzXCJcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnRoZW4gKGRhdGEpIC0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2IgbnVsbFxyXG5cdFx0XHRcdFx0XHRcdGNzczogKGNiKSAtPlxyXG5cdFx0XHRcdFx0XHRcdFx0JCgnPGxpbmsvPicpLmF0dHJcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRocmVmOiBcImV4dC8je2FwcC5pZH0vbWFpbi5jc3NcIlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJlbDogJ3N0eWxlc2hlZXQnXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5hcHBlbmRUbyAnaGVhZCdcclxuXHRcdFx0XHRcdFx0XHRcdGNiIG51bGxcclxuXHRcdFx0XHRcdFx0XHRodG1sOiBbJ2pzJywgJ2NzcycsIC0+XHJcblx0XHRcdFx0XHRcdFx0XHQkLmdldCBcImV4dC8je2FwcC5pZH0vbWFpbi5odG1sXCJcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnRoZW4gKGRhdGEpIC0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2NvcGUuJGFwcGx5IC0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlbGVtZW50Lmh0bWwgZGF0YVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKSBzY29wZVxyXG5cdFx0XHRcdFx0XHRcdF1cclxuXHRcdFx0XHQsIHRydWVcclxuXVxyXG4iXX0=