angular.module('calendarDemoApp', []);

// your controller and directive code go here
angular.module('calendarDemoApp')
	.directive('monthSelector', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/month-selector.html',
			scope: true,
			transclude: true,
			controller: ['$scope', function($scope) {
				var today = new Date();
				var month = today.getMonth();
				var year = today.getFullYear();

				$scope.date = {
					month: month,
					year: year
				}

				var start = year - 20;
				var end = year + 20;

				$scope.months = ['january', 'february', 'march',
					'april', 'may', 'june', 'july', 'august',
					'september', 'october', 'november', 'december'
				];

				var years = [];
				for (var i=start; i<=end; i++) {
					years.push(i);
				}

				$scope.years = years;

				var self = this;
				self.date = $scope.date;


			}]
		}
	})
	.directive('calendar', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/calendar.html',
			require: '?^monthSelector',
			link: function(scope, element, attrs, monthSelectorCtrl) {
				scope.date = monthSelectorCtrl.date;

				scope.$watchCollection('date', function(date) {
					var date = new Date(date.year, date.month, 1);
					var range = CalendarRange.getMonthlyRange(date);
					scope.range = range;
				});

				scope.isCurrentMonth = function(month) {
					return month == scope.date.month;
				}

			}

		}
	})