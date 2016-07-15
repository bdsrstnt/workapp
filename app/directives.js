angular.module('directives', [])
    .directive('workCard', ['$timeout', '$mdDialog', '$translate', 'JobService', function ($timeout, $mdDialog, $translate, JobService){
        var ddo = {
            templateUrl: 'app/partials/workCard.html',
            scope:{
                job: "=",
                jobId: "@",
                color: "=?"
            },
            link: function(scope, elem, attrs){
                scope.addThisTask;
                scope.$on('count', function(){
                    if(scope.job.active){
                        scope.job.seconds += 60;
                        scope.$apply();
                    }
                });
                scope.remove = function(){
                    var dialog = $mdDialog.confirm().title($translate.instant('WARNING') + ' - ' + scope.job.jobTitle)
                        .textContent($translate.instant('JOB.REMOVE.DIALOG.TEXT'))
                        .ok($translate.instant('OK'))
                        .cancel($translate.instant('CANCEL'))
                        .openFrom('#' + scope.jobId)
                        .closeTo('#' + scope.jobId);

                    $mdDialog.show(dialog)
                        .then(function(){
                            dialog = undefined;
                            JobService.removeJob(scope.job.index);
                        })
                }

                scope.addTask = function(){
                    if(scope.addThisTask.length === 0){
                        return;
                    }
                    scope.job.taskList.push({
                        name: scope.addThisTask,
                        done: false
                    });
                    scope.addThisTask = "";
                }

                //menu opener
                var originatorEv;
                scope.openMenu = function($mdOpenMenu, ev) {
                    originatorEv = ev;
                    $mdOpenMenu(ev);
                };
                
                //details dialog opener
                scope.job.logs = scope.job.logs || [];
                function DialogController($scope, $mdDialog, logs) {
                    $scope.logs = logs;
                    $scope.closeDialog = function() {
                        $mdDialog.hide($scope.logs);
                    }

                    $scope.logInput = "";

                    $scope.addLog = function(){
                        if($scope.logInput.length === 0){
                            return;
                        }
                        $scope.logs.push({
                            time: new Date(),
                            text: '' + $scope.logInput
                        });
                        $scope.logInput = "";
                    };
                }

                scope.showTabDialog = function(ev) {
                    $mdDialog.show({
                        templateUrl: 'app/partials/workdCard.dialog.tpl.html',
                        parent: (angular.element(document.querySelector('#id' + scope.jobId))),
                        targetEvent: ev,
                        clickOutsideToClose:true,
                        locals: {
                            logs: scope.job.logs
                        },
                        controller: DialogController
                    }).then(function(data) {
                        scope.job.logs = data;
                    }, function() {

                    });
                };

                scope.turnOnOff = function () {
                    if(!scope.job.active){
                        return;
                    }
                    JobService.activate(scope.job);
                }
            }
        }

        return ddo;
    }])
    .directive('project', ["$mdDialog", function($mdDialog){
        var ddo = {
            scope:{
                project: "=projectModel"
            },
            templateUrl: 'app/partials/project.html',
            link: function(scope, elem, attrs){
                scope.orderByList = ["+priority", "-priority", "+addedOn", "-addedOn"];
                scope.visible = true;
                scope.color = "White";
                scope.colors = CSS_COLOR_NAMES;
                scope.numberOfWorks = scope.project.jobs.length;
                if(scope.project.jobs.length == 0){
                    scope.project.jobs = [{name: '', active: CONFIG.AUTO_START, startTime: new Date(), index: 0, seconds: 0, taskList: []}];
                }

                scope.search = {
                    jobTitle: ''
                }

                scope.addJob = function(){
                    inactivateAllJobs();
                    ++scope.numberOfWorks;
                    scope.project.jobs.push({
                        active: CONFIG.AUTO_START,
                        seconds: 0,
                        addedOn: new Date(),
                        index: scope.numberOfWorks,
                        taskList: [],
                        jobTitle: '',
                        priority: 0
                    });
                };

                scope.$on("job.remove", function(evt, index){
                    scope.project.jobs.splice(index, 1);
                    --scope.numberOfWorks;
                    //indexek ujraszamolasa
                    for(var i in scope.project.jobs){
                        var j = scope.project.jobs[i];
                        j.index = i;
                    }
                });

                function inactivateAllJobs(){
                    for(var i = 0; i < scope.project.jobs.length; ++i){
                        scope.project.jobs[i].active = false;
                    }
                }
            }
        }

        return ddo;
    }])
    .directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    }).directive('ngRightClick', function($parse) {
        return function(scope, element, attrs) {
            var fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function(event) {
                scope.$apply(function() {
                    event.preventDefault();
                    fn(scope, {$event:event});
                });
            });
        };
    }).directive('prioritySelector', function() {
        var ddo = {
            scope:{
                model: "="
            },
            templateUrl: 'app/partials/prioritySelector.html',
            link: function(scope, elem, attrs){
                scope.priorityList = ["D", "C", "B", "A"];
                scope.model = scope.model ? scope.model : 3;
                scope.increment = function() {
                    --scope.model;
                    if(scope.model < 0){
                        scope.model = 3;
                    }
                }
            }
        }

        return ddo;
    }).directive('tips', function($interval, $timeout) {
        var ddo = {
            scope: {
                delay: "=?"
            },
            templateUrl: 'app/partials/tips.html',
            link: function(scope, elem, attrs){
                scope.delay = scope.delay ? scope.delay : 5000;
                scope.tipNumber = 1;
                scope.tipKey = "JUST_THE_TIP_" + scope.tipNumber;
                scope.change = false;
                $interval(function(){
                    scope.change = true;
                    $timeout(function(){
                        scope.change = false;
                    }, 4000)
                    if(scope.tipNumber === 7){
                        scope.tipNumber = 1;
                    } else {
                        scope.tipNumber += 1;
                    }
                    scope.tipKey = "JUST_THE_TIP_" + scope.tipNumber;
                }, scope.delay);
            }
        }

        return ddo;
    })