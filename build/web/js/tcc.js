var app = angular.module('clienteAngular', ['angular.filter']);
        const SERVICE_RAIZ = "http://" + location.host + "/ServicoEnvioMysql/webresources/";
        const SERVICE_LEITURA = SERVICE_RAIZ + "entidades.leitura";
        const SERVICE_DADO = SERVICE_RAIZ + "entidades.dado";
        function listaLeituras($scope, $http) {
            $http.get(SERVICE_LEITURA)
                    .success(function (response) {
                        $scope.leituras = response;
                    });
        }
function listaDados($scope, $http) {
    $http.get(SERVICE_DADO)
            .success(function (response) {
                $scope.dados = response;
            });
}

app.controller('leituraCtrl', function ($scope, $http) {
    $scope.leituraHide = true;
    $scope.novaLeituraHide = true;
    $scope.estadoLeituras = "Mostra Leituras"
    $scope.mostrarLeituras = function () {
         if($scope.leituraHide === true) {
            $scope.leituraHide = false;
            $scope.estadoLeituras = "Esconde Leituras"
        }
        else {
            $scope.leituraHide = true;
            $scope.estadoLeituras = "Mostra Leituras"
        }
    };
    $scope.divNova = function () {
        $scope.novaLeituraHide = false;
    };
    $scope.iniciaLeituras = function ()
    {
        listaLeituras($scope, $http);
    };
    $scope.envia = function (leitura) {
        $scope.novaLeituraHide = true;
        $http.post(SERVICE_LEITURA, leitura)
                .success(function () {
                    $scope.novaLeituraHide = true;
                    listaLeituras($scope, $http);
                });
    };
    $scope.cancelaLeitura = function () {
        $scope.novaLeituraHide = true;
    };
});

app.controller('dadoCtrl', function ($scope, $http) {
    $scope.dadoHide = true;
    $scope.estadoDados = "Mostra Dados"
    $scope.mostrarDados = function () {
         if($scope.dadoHide === true) {
            $scope.dadoHide = false;
            $scope.estadoDados = "Esconde Dados"
        }
        else {
            $scope.dadoHide = true;
            $scope.estadoDados = "Mostra Dados"
        }
    };
    $scope.novoDadoHide = true;
    $scope.divNova = function () {
        $scope.novoDadoHide = false;
        listaLeituras($scope, $http);
    }
    $scope.iniciaDados = function ()
    {
        listaDados($scope, $http);
    };
    $scope.envia = function (dado) {
        var didL = angular.fromJson(dado.idLeitura);
        didL.idLeitura = didL.idLeitura.toString();
        didL.intervaloEntreAmostras = didL.intervaloEntreAmostras.toString();
        didL.quantidadeSensores = didL.quantidadeSensores.toString();
        dado.idLeitura = didL;

        var newObject = JSON.parse(JSON.stringify(dado));
        newObject.idLeitura = undefined;
        newObject.sensor = Number(newObject.sensor);
        newObject.valor = Number(newObject.valor);
        dado.hash = CryptoJS.MD5(JSON.stringify(newObject)).toString();

        $http.post(SERVICE_DADO, dado)
                .success(function () {
                    $scope.novoDadoHide = true;
                    listaDados($scope, $http);
                });
    };
    $scope.cancelaDado = function () {
        $scope.novoDadoHide = true;
    };
});
app.controller('joinCtrl', function ($scope, $http) {
    $scope.iniciaDados = function ()
    {
        listaDados($scope, $http);
    };
});

app.controller('ulCtrl', function ($scope, $http) {
    
    $scope.iniciaUl= function () {
        $scope.ulHide = true;
        $scope.maisOuMenos = "+";
    };
    
    $scope.mostraUl = function () {       
        if($scope.ulHide === true) {
            $scope.ulHide = false;
            $scope.maisOuMenos = "-";
        }
        else {
            $scope.ulHide = true;
            $scope.maisOuMenos = "+";
        }
    };
});