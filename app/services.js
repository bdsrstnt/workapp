angular.module('services', [])
    .service("JobService", ['$log', 'localStorageService', '$mdToast', '$translate', 'SettingsService', function($log, localStorageService, $mdToast, $translate, SettingsService){
        var jobList = [];
        var numberOfJobs = 0;
        var activeJob = null;

        function inactivateAllJobs(){
            for(var i = 0; i < jobList.length; ++i){
                jobList[i].active = false;
            }
        }

        return {
            addJob: function(){
                ++numberOfJobs;
                inactivateAllJobs();
                jobList.push({
                    active: true,
                    seconds: 0,
                    addedOn: new Date(),
                    index: numberOfJobs,
                    taskList: [],
                    jobTitle: '',
                    priority: 0
                });

                $log.debug(jobList);
            },
            activate: function(job){
                inactivateAllJobs();
                job.active = true;
                activeJob = job;
            },
            removeJob: function(index){
                jobList.splice(index, 1);
                --numberOfJobs;
                for(var i in jobList){
                    jobList[i].index = i;
                }
            },
            save: function(){
                localStorageService.set(CONFIG.LOCAL_STORAGE_ID, jobList);
                SettingsService.save();
                $mdToast.show(
                    $mdToast.simple()
                        .textContent($translate.instant('TOAST.SAVE'))
                        .position('top right')
                        .hideDelay(1500)
                );
            },
            load: function(){
                jobList = localStorageService.get(CONFIG.LOCAL_STORAGE_ID);
                SettingsService.load();
                if(!jobList){
                    jobList = [];
                }
            },
            clear: function(){
                localStorageService.clearAll();
                jobList = [];
            },
            getJobList: function() {
                return jobList;
            },
            getSummary: function(){
                var jobTitleSummary = "";
                var summarySeconds = 0;
                for(var i in jobList){
                    var job = jobList[i];
                    jobTitleSummary += job.jobTitle;
                    jobTitleSummary += ", ";
                    summarySeconds += job.seconds;
                }
                return {
                    jobTitleSummary: jobTitleSummary,
                    summarySeconds: summarySeconds
                }
            },
            getGroups: function(key){
                var retVal = {};
                angular.forEach(jobList, function(job){
                    var date = new Date(job[key]).toDateString();
                    if(!retVal[date]){
                        //var groupKey =
                        retVal[date] = {
                            date: job[key],
                            jobList: []
                        }
                    }
                    retVal[date].jobList.push(job);
                });
                return retVal;
            },
            activeJob: function(){
                return activeJob;
            }
        }
    }]).service("SettingsService", ['$log', 'localStorageService', '$mdToast', '$translate', function($log, localStorageService, $mdToast, $translate){
        var settings = {
            color: "dimgrey",
            orderBy: "",
            orderByList: ["+jobTitle", "-jobTitle", "+priority", "-priority", "+addedOn", "-addedOn"],
            colorList: CSS_COLOR_NAMES
        };

        var localStorageId = CONFIG.LOCAL_STORAGE_ID + "SettingsService";

        return {
            getSettings: function(){
                return settings;
            },
            save: function(){
                localStorageService.set(localStorageId, settings);
            },
            load: function(){
                settings = localStorageService.get(localStorageId);
                if(!settings){
                    settings = {
                        color: "dimgrey",
                        orderBy: "",
                        orderByList: ["+jobTitle", "-jobTitle", "+priority", "-priority", "+addedOn", "-addedOn"],
                        colorList: CSS_COLOR_NAMES
                    };
                }
            }
        }
    }]);