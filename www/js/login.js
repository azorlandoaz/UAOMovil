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

log.controller('PopupCtrl',function($scope, $ionicPopup, $timeout, $ionicLoading, $ionicScrollDelegate) {

  $scope.logIn = function(){
         location.assign("views/main.html");
  }


   // An alert dialog
   $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Para recuperar tu contraseña',
       template: 'Debes hacerlo desde el portal estudiantil<br><br>Recuerda que el usuario y la contraseña son los institucionales '
     });
    
   };
});
