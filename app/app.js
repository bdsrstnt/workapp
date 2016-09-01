angular.module("workApp", [
    "ngRoute", "directives", "controllers", "filters", "LocalStorageModule", "pascalprecht.translate", "ngSanitize", "ngMaterial"])
    .config(function (localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix(CONFIG.LOCAL_STORAGE_ID);
        localStorageServiceProvider.setStorageType("localStorage");
    })
    .config([ "$translateProvider",
        function ($translateProvider) {
            $translateProvider.useStaticFilesLoader({
                prefix: "lang/",
                suffix: ".json"
            });

            $translateProvider.preferredLanguage("en");
            $translateProvider.fallbackLanguage("en");
            $translateProvider.useSanitizeValueStrategy("sanitize");
        }])
    .config(["$mdIconProvider", function($mdIconProvider) {
        $mdIconProvider
            .iconSet("morevertical", "img/more-vertical.svg", 24);
    }])
    .config(["$mdThemingProvider", function($mdThemingProvider) {
        $mdThemingProvider.theme("default")
            .primaryPalette(SETTINGS.THEME.primaryPalette)
            .accentPalette(SETTINGS.THEME.accentPalette);
    }]);