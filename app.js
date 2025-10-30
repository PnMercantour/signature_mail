var app = angular.module('email', []);

app.controller('mainCtrl', function ($sce) {

    var vm = this;
    angular.extend(vm, CONFIG);

    vm.template = vm.templates[0];

    vm.lien_parc = $sce.trustAs('html', vm.lien_parc);
    vm.adresse = $sce.trustAs('html', vm.adresse);
    vm.facebook = $sce.trustAs('html', vm.facebook);
    vm.pinterest = $sce.trustAs('html', vm.pinterest);
    vm.twitter = $sce.trustAs('html', vm.twitter);
    vm.instagram = $sce.trustAs('html', vm.instagram);
    vm.youtube = $sce.trustAs('html', vm.youtube);
    vm.linkedin = $sce.trustAs('html', vm.linkedin);
    vm.check_case = true;
    vm.multiline_function = false;
    vm.fonction_ligne1 = '';
    vm.fonction_ligne2 = '';


    vm.formatName = function (name) {
        if (vm.check_case && name) {
            [' ', '-'].forEach(function (sep) {
                var chunks = name.split(sep).map(function (e) {
                    return e[0].toUpperCase() + e.slice(1);
                })
                name = chunks.join(sep);
                return name;
            });
        }
        return name;
    }

    vm.formatFunction = function (name) {
        // Si le mode multiligne est activé, utiliser les deux champs séparés
        if (vm.multiline_function) {
            var ligne1 = vm.fonction_ligne1 || '';
            var ligne2 = vm.fonction_ligne2 || '';

            // Formater chaque ligne si la correction de casse est activée
            if (vm.check_case) {
                ligne1 = vm.formatSingleLine(ligne1);
                ligne2 = vm.formatSingleLine(ligne2);
            }

            // Combiner les deux lignes avec un saut de ligne
            if (ligne1 && ligne2) {
                return $sce.trustAsHtml(ligne1 + '<BR />' + ligne2);
            } else if (ligne1) {
                return $sce.trustAsHtml(ligne1);
            } else if (ligne2) {
                return $sce.trustAsHtml(ligne2);
            } else {
                return $sce.trustAsHtml('');
            }
        }

        // Mode normal (une seule ligne)
        if (vm.check_case && name) {
            name = vm.formatSingleLine(name);
        }

        return $sce.trustAsHtml(name || '');
    }

    // Fonction helper pour formater une ligne
    vm.formatSingleLine = function (text) {
        if (!text) return text;

        ['-'].forEach(function (sep) {
            var chunks = text.split(sep).map(function (e) {
                return e[0].toUpperCase() + e.slice(1);
            })
            text = chunks.join(sep);
        });

        return text;
    }

    vm.formatLastName = function (name) {
        if (vm.check_case && name) {
            return name.toUpperCase();
        }
        return name;
    }

    vm.save = function (with_logos) {
        var data = document.getElementById('preview').innerHTML;

        data = '<HTML> <HEAD> <meta charset="utf8" /> </HEAD>' + data + '</BODY> </HTML>';

        var dwn = document.createElement('a');

        dwn.setAttribute('href', 'data:text/html,' + encodeURIComponent(data));
        dwn.setAttribute('download', 'signature_' + vm.prenom.toLowerCase() + '_' + vm.nom.toLowerCase() + '.htm');
        document.body.appendChild(dwn);
        dwn.click();
    }
});
