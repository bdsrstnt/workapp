angular.module('controllers', ['services', 'timer'])
    .controller('workCtrl', ['$scope', '$interval', 'localStorageService', '$window', '$mdDialog', '$mdToast', '$translate', 'JobService', '$log', 'SettingsService',
        function($scope, $interval, localStorageService, $window, $mdDialog, $mdToast, $translate, JobService, $log, SettingsService){
            JobService.load();
            $scope.jobList = JobService.getJobList();
            $scope.settings = SettingsService.getSettings();

            $scope.clock = new Tock({
                interval: 1000,
                callback: function(){
                    $scope.$broadcast('count');     
                }
            });
            $scope.clock.start();

            function SummaryController($scope, $mdDialog, summaryText, sumSeconds, JobService) {
                $scope.summaryText = summaryText;
                $scope.sumSeconds = sumSeconds;
                $scope.groups = JobService.getGroups("addedOn");
                $scope.closeDialog = function() {
                    $mdDialog.hide();
                }
            }
            $scope.showSummary = function (ev) {
                var summary = JobService.getSummary();
                $mdDialog.show({
                    templateUrl: 'app/partials/project.summary.tpl.html',
                    parent: angular.element("body"),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    locals: {
                        summaryText: summary.jobTitleSummary,
                        sumSeconds: summary.summarySeconds,
                        JobService: JobService
                    },
                    controller: SummaryController
                }).then(function(data) {
                }, function() {

                })
            }

            $scope.startDate = localStorageService.get(CONFIG.START_DATE_LS_ID);
            if(!$scope.startDate){
                $scope.startDate = new Date();
            }

            $scope.addJob = function() {
                JobService.addJob();
            }

            $scope.confirmClear = function(){
                var clearAlert = $mdDialog.confirm().title($translate.instant('WARNING'))
                    .textContent($translate.instant('CLEAR.DIALOG.TEXT'))
                    .ok($translate.instant('OK'))
                    .cancel($translate.instant('CANCEL'))
                    .openFrom('#clearButton')
                    .closeTo('#clearButton');

                $mdDialog.show(clearAlert)
                    .then(function(){
                        $scope.clear();
                        clearAlert = undefined;
                    })
            };

            $scope.autoStart = CONFIG.AUTO_START;
            $scope.switchAutoStart = function(){
                CONFIG.AUTO_START = !CONFIG.AUTO_START;
                $scope.autoStart = CONFIG.AUTO_START;
            }

            $scope.save = function(){
                JobService.save();
            }

            $scope.clear = function(){
                JobService.clear();
                $scope.jobList = JobService.getJobList();
            }

            $scope.donate = function(){
                window.open("/donate.html");
            }

            $scope.about = function(ev){
                $mdDialog.show({
                    templateUrl: 'app/partials/about.dialog.tpl.html',
                    parent: angular.element("body"),
                    targetEvent: ev,
                    clickOutsideToClose: true
                });
            }

            $interval(function(){
                JobService.save();
            }, CONFIG.SAVE_FREQUENCY);


            $scope.showOptionsDialog = function(ev) {
                $mdDialog.show({
                    templateUrl: 'app/partials/options.dialog.html',
                    parent: angular.element("body"),
                    targetEvent: ev,
                    clickOutsideToClose: true
                });
            }
        }
    ])
    .controller('OptionsDialogCtrl', ["$mdDialog", "$scope", "$window", "JobService", function($mdDialog, $scope, $window, JobService){
        $scope.theme = CONFIG.THEME;

        $scope.closeDialog = function() {
            JobService.save();
            window.localStorage.setItem(CONFIG.LOCAL_STORAGE_ID, JSON.stringify(CONFIG));
            $window.location.reload();
        }

        $scope.colors = ["red",
            "pink",
            "purple",
            "deep-purple",
            "indigo",
            "blue",
            "light-blue",
            "cyan",
            "teal",
            "green",
            "light-green",
            "lime",
            "yellow",
            "amber",
            "orange",
            "deep-orange",
            "brown",
            "grey",
            "blue-grey"];
    }])
    .controller('SimpleDialogCtrl', ["$mdDialog", "$scope", function($mdDialog, $scope){
        $scope.closeDialog = function() {
            $mdDialog.hide();
        }
    }]);