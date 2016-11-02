 var control = angular.module('ionicApp', ['ionic']);

control.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
 // $ionicConfigProvider.tabs.position('bottom');
  
});

control.controller('apps', function($scope, $ionicTabsDelegate, $ionicPopup) {

  if(ionic.Platform.isAndroid()){
    $scope.platform = "Android";
  }else{
    $scope.platform = "IOS";
  }
  $scope.platform = ionic.Platform;
  $scope.groups = [];
  for (var i=0; i<2; i++) {
    $scope.groups[i] = {
      name: "",
      items: [[{app:"Notas y Horario",
               logoSRC:"../img/NYHLogo.png",
               ID:1},
              {app:"Campus Sostenible",
               logoSRC:"../img/CSLogo.png",
               ID:2}]]
    };
    /*for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + "-" + j);
    }*/
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
    return $scope.shownGroup === group;
  };

   $scope.goForward = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1) {
            $ionicTabsDelegate.select(selected + 1);
        }
    }

    $scope.goBack = function () {
        var selected = $ionicTabsDelegate.selectedIndex();
        if (selected != -1 && selected != 0) {
            $ionicTabsDelegate.select(selected - 1);
        }
    }
    
     // A confirm dialog
   
   $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Cerrar sesión',
       template: '¿Estas seguro que desea cerrar sesión?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
         location.assign("../index.html")
       } else {
         console.log('You are not sure');
       }
     });
   }; 
    
});