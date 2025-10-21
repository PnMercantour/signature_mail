var app = angular.module('email', []);

app.controller('mainCtrl', function($sce){

    var vm = this;
    angular.extend(vm, CONFIG);

    vm.template = vm.templates[0];

    vm.lien_parc = $sce.trustAs('html', vm.lien_parc);
    vm.facebook = $sce.trustAs('html', vm.facebook);
    vm.pinterest = $sce.trustAs('html', vm.pinterest);
    vm.twitter = $sce.trustAs('html', vm.twitter);
    vm.instagram = $sce.trustAs('html', vm.instagram);
    vm.youtube = $sce.trustAs('html', vm.youtube);

    vm.formatName = function(name){
        if(vm.check_case && name){
            [' ', '-'].forEach(function(sep){
                var chunks = name.split(sep).map(function(e){
                    return e[0].toUpperCase() + e.slice(1);
                })
                name = chunks.join(sep);
                return name;
            });
        }
        return name;
    }

    vm.formatLastName = function(name){
        if(vm.check_case && name){
            return name.toUpperCase();
        }
        return name;
    }

    vm.save = function(with_logos){
        var data = document.getElementById('preview').innerHTML;

        data = '<HTML> <HEAD> <meta charset="utf8" /> </HEAD>' + data + '</BODY> </HTML>';

        var dwn = document.createElement('a');

        dwn.setAttribute('href', 'data:text/html,' + encodeURIComponent(data));
        dwn.setAttribute('download', 'signature_' + vm.prenom.toLowerCase() + '_' + vm.nom.toLowerCase() + '.htm');
        document.body.appendChild(dwn);
        dwn.click();
    }
});
