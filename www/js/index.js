 var control = angular.module('ionicApp', ['ionic']);

/*control.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
 // $ionicConfigProvider.tabs.position('bottom');
  
});*/

control.controller('apps', function($scope, $ionicTabsDelegate, $ionicPopup, $ionicLoading, $ionicPopover, $http) {

  if(ionic.Platform.isAndroid()){
    $scope.platform = "Android";
  }else{
    $scope.platform = "IOS";
  }
  
  $scope.platform = ionic.Platform;
  $scope.groups = [];
  var ip = "52.39.250.182";
  var port = 8181;
  var URL = "https://"+ip+":"+port+"/WebApplication7/service/aplications";

  for (var i=0; i<2; i++) {
    $scope.groups[0] = {
      name: "",
      items: [[{app:"Notas y Horario",
               logoSRC:"../img/NYHLogo.png",
               ID:1},
              {app:"Campus Sostenible",
               logoSRC:"../img/CSLogo.png",
               ID:2}]]
    };
    $scope.groups[1] = {
      name: "",
      items: [[{app:"Portal UAO",
               logoSRC:"../img/PortalUAOLogo.png",
               ID:1},
              {app:"Moodle - Augusta",
               logoSRC:"../img/AugustaLogo.png",
               ID:2}],
             [{app:"Moodle - Siga",
               logoSRC:"../img/SigaLogo.png",
               ID:3},
              {app:"Correo",
               logoSRC:"../img/CorreoLogo.png",
               ID:4}],
             [{app:"UAO Semana",
               logoSRC:"../img/UAOSemanaLogo.png",
               ID:5},
              {app:"Biblioteca",
               logoSRC:"../img/BibliotecaLogo.png",
               ID:6}]]
    };
    /*for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + "-" + j);
    }*/
  };

  $scope.groups[0].name = "Apps Moviles";
  $scope.groups[1].name = "Apps Web";

  $http.get(URL).then(function(resp){
		console.log('Success', resp);
    
	}, function(err){
		console.error('ERR', err);
	})
  
  $scope.$on("$ionicView.loaded", function(event, data){
    console.log("State Params:");
   $ionicLoading.show();
   console.log("State Params: ", data.stateParams);
});

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
         location.assign("../index.html")
       } else {
         console.log('You are not sure');
       }
     });
   }; 



   // Display Popover
        $scope.openPopover = function($event, templateName) {
            // Init popover on load
            $ionicPopover.fromTemplateUrl('templates/'+templateName, {
                scope: $scope,
            }).then(function(popover) {
                $scope.popover = popover;
                $scope.popover.show($event);
            });
        };

        $scope.closePopover = function() {
            $scope.popover.hide();
        };

    
});