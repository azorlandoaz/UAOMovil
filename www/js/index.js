 var control = angular.module('ionicApp', ['ionic']);

/*control.config(function($stateProvider, $URLAppsRouterProvider, $ionicConfigProvider) {
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
  $scope.news = [];
  var ip = "54.148.141.5";
  var port = 8181;
  var URLApps = "https://"+ip+":"+port+"/WebApplication7/service/aplications";
  var URLNews = "http://louaodelasemana.uao.edu.co/wp-json/wp/v2/posts";

  for (var i=0; i<2; i++) {
    $scope.groups[0] = {
      name: "",
      items: [[],[],[],[],[]]
    };
    $scope.groups[1] = {
      name: "",
      items: [[],[],[],[]]
    };
  };

  $scope.groups[0].name = "Apps Móviles";
  $scope.groups[1].name = "Apps Web";
  //var i = 0;
  $http.get(URLApps).then(function(resp){
		//console.log('Success', resp);
    var type = " ";
    var j = 0;
    var l = 0;
    var k = 1;
    var h = 1;
    for(i=0;i<=resp.data.aplications.length;i++){
      
      console.log($scope.groups[1]);
      
      type = resp.data.aplications[i].type;
      if(angular.equals(type,"WEB")){
        if(k<=2){
          $scope.groups[1].items[j].push(resp.data.aplications[i]);
        }
        if(k>2){
          if(k == 3){j++;console.log(k);}
          $scope.groups[1].items[j].push(resp.data.aplications[i]);
          if(k%2 == 0){j++;console.log(k);}
        }
        k++;
    }else if(angular.equals(type,"APP")){
       if(h<=2){
          $scope.groups[0].items[l].push(resp.data.aplications[i]);
        }else if(h>2){
          if(h == 3){l++;console.log(l);}
          $scope.groups[0].items[l].push(resp.data.aplications[i]);
          if(h%2 == 0){l++;}
        }
        h++;
      }
      
    }
    
    
	}, function(err){
		console.error('ERR', err);
	});

  $http.get(URLNews).then(function(resp){
    $scope.news = resp.data;
    console.log($scope.news);
    //console.log($scope.news[0]._links['wp:attachment'][0].href);
  }, function(err){
    console.error('ERR', err);
  });
  
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
       template: '¿Seguro que desea cerrar sesión?',
       cancelText: 'Cancelar',
        okText: 'Sí'
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
        $scope.openPopover = function($event, templateName, description, logo, linkWeb, linkAndroid, linkIOS, name) {
            // Init popover on load
            $ionicPopover.fromTemplateUrl('templates/'+templateName, {
                scope: $scope,
            }).then(function(popover, desc, log, linkW, linkA, linkI, nombre) {
                $scope.popover = popover;
                $scope.passing= {'desc':description,
                                 'log':logo,
                                 'linkW':linkWeb,
                                 'linkA':linkAndroid,
                                 'linkI':linkIOS,
                                 'nombre':name};
                $scope.popover.show(".all");
                
            });
        };

        $scope.closePopover = function() {
            $scope.popover.hide();
        };

      $scope.startNewRow = function (index, count) {
         return ((index) % count) === 0;
      };

      $scope.openLink = function(link){
        window.open(link, '_system');
      };
    
});

control.filter("trust", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);

