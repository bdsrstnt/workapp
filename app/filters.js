angular.module('filters', [])
    .filter('prettifySeconds', function() {
        return function(input) {
            var seconds = input % 60;
            var minutes = Math.floor(input / 60) % 60;
            var hours = Math.floor(input / 3600) % 24;

            if(seconds < 10){
                seconds = "0" + seconds;
            }

            if(minutes < 10){
                minutes = "0" + minutes;
            }

            if(hours < 10){
                hours = "0" + hours;
            }

            return hours + ":" + minutes;
        };
    });