app.controller('titleCtrl', function ($scope, $http) {
     $scope.listaIp = function() {
            $http.get("https://api.ipify.org?format=json")
                    .success(function (response) {
                        $scope.tituloIp = response.ip;
                    });
        };
 }); 