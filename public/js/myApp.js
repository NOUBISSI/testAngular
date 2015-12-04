var app = angular.module("myApp", ['chart.js', 'btford.socket-io' ]); // déclaration du module

app.controller("LineCtrl", function ($scope) {
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    // [65, 59, 80, 81, 56, 55, 40],
    // [28, 48, 40, 19, 86, 27, 90]
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
});
var tab =[30, 50, 10];
app.controller("DoughnutCtrl", function ($scope) {
  // $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  // $scope.data = [30, 50, 10];
});





app.factory('mySocket',	function	(socketFactory)	{	
	return	socketFactory();	
})
.controller('socket.io.contoller',	function	($scope, mySocket)	{	

  // permet de setter le titre de la page
  $scope.title = "Test angularjs";


  // permet de gerer l'affichage du camanbert
  $scope.labels = ["Yes", "No", "I don't know"];
  $scope.data = [0, 0, 0];
  // cam

  $scope.currentTime = new Date();
  $scope.btn = '';

  // function qui sera exécuté lorsqu'on appuie sur le boutton yes
  $scope.btnYes = function(){
    mySocket.emit('btnYes', new Date());
    console.log($scope.data);
  };


  // function qui sera exécuté lorsqu'on appuie sur le boutton No
  $scope.btnNo = function(){
    mySocket.emit('btnNo', new Date());
    console.log($scope.data);
  };


  // function qui sera exécuté lorsqu'on appuie sur le boutton don't know
  $scope.dKnow = function(){
    mySocket.emit('dKnow', new Date());
    console.log($scope.data);
  };


  // socket écoute le sur l'évement yes
  mySocket.on('btnYes', function(data){ // cette function est exécuté lorsqu'on reçois  l'évement Yes
    console.log(data);
    console.log(tab[0]);
    $scope.data[0] += 1;
  });


  // socket écoute le sur l'évement No
  mySocket.on('btnNo', function(data){ // cette function est exécuté lorsqu'on reçois  l'évement No
    console.log(tab[0]);
    $scope.data[1] += 1;
  });


  // socket écoute le sur l'évement No
  mySocket.on('dKnow', function(data){ // cette function est exécuté lorsqu'on reçoit  l'évenement I don't know
    console.log(tab[0]);
    $scope.data[2] += 1;
  });



  mySocket.on('userNumber', function(data){
    console.log(data);
    $scope.userNumber = data;
    mySocket.emit('news', 'ok');
  });

  mySocket.on('news', function(data){
    console.log(data);
  });
  
  mySocket.on('time', function(data){
    $scope.currentTime = data;
  });

});

