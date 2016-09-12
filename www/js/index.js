 var control = angular.module('ionicApp', ['ionic']);

control.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  console.log('HomeTabCtrl');

  
});
control.controller('apps', function($scope) {
  console.log('HomeTabCtrl');

  $scope.groups = [];
  for (var i=0; i<2; i++) {
    $scope.groups[i] = {
      name: ""+i,
      items: []
    };
    for (var j=0; j<1; j++) {
      $scope.groups[i].items.push(i + "-" + j);
    }
  };

  $scope.groups[0].name = "Apps Moviles";
  $scope.groups[1].name = "Apps Web";
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === "Apps Moviles";
  };

  $scope.toggleGroup2 = function(group) {
    if ($scope.isGroupShown2(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown2 = function(group) {
    return $scope.shownGroup === "Apps Web";
  };
});