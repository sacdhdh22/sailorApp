var app = angular.module('sailor.controller',['ngMaterial','angularSpinner']);

app.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setDefaults({color: 'blue'});
}]);

//survey controller
app.controller('boatController', function($scope, $http, $mdToast,usSpinnerService,$window){
    $scope.sailor = true;
    $scope.boat = true;

     $scope.getSailorReservation = function(){ 
       $scope.sailor = false;
       $scope.boat = true;
    }
      $scope.getBoatReservation  = function(){
       $scope.sailor = true;
    $scope.boat = false;
    }
    usSpinnerService.spin('spinner-1');
    $http.get('/getAllSailors') .then(function(data){
            $scope.names = data.data[0];
            $scope.getData = function(name){
              var sailorname = $scope.name;
              $http.post('/getAllReservation',  { sailorName: $scope.name}).then(function(data){
                console.log(data.data)
                $scope.reservations = data.data
              })

            }
    });

        $http.get('/getAllBoats') .then(function(data){
         $scope.boatnames = data.data[0];
            $scope.getBoatData = function(name){
         
              $http.post('/getAllBoatReservation',  { boatName: $scope.boatName}).then(function(data){
                console.log(data.data)
                $scope.boatreservations = data.data
                console.log($scope.boatreservations)
              })

            }

        })
   

});
