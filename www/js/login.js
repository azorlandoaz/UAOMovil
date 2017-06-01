 var log = angular.module('ionicApp', ['ionic'])

.directive('focusMe', function($timeout) {
  return {
    link: function(scope, element, attrs) {

      $timeout(function() {
        element[0].focus(); 
      });
    }
  };
});

log.controller('PopupCtrl',function($scope, $ionicPopup, $timeout, $ionicLoading, $ionicScrollDelegate, $http) {

  var ip = "54.148.141.5";
  var port = 8181;
  var URLlogin = "https://"+ip+":"+port+"/WebApplication3/service/service.login";
  $scope.user = "";
  $scope.password = "";

  $scope.logIn = function(infodata){
    $scope.user = infodata.user;
    $scope.password = infodata.password;
    $scope.loadUser();
  }


   // An alert dialog
   $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: '¿No puedes ingresar?',
       template: 'Para recuperar tu contraseña debes hacerlo desde el portal estudiantil<br><br>Recuerda que el usuario y la contraseña son los institucionales '
     });
    
   };

   $scope.showAlertLog = function() {
     var alertPopup = $ionicPopup.alert({
       title: '¿Olvidaste tu contraseña?',
       template: '<div style"z-index:9999999;">El usuario y/o contraseña ingresaste es incorrecto.</div>'
     });
    
   };

   $scope.loadUser = function(){
    $http.get(URLlogin+"/"+$scope.user).then(function(resp){
    if($scope.password === resp.data.password) {location.assign("views/main.html");}
    else{ $scope.showAlertLog();}
  }, function(err){
    $ionicLoading.show({
      template: 'error en la red ...',
      duration : 2000
    });
    console.error('ERR', err);
  });
  };

});
