module.exports = function (options, grunt) {

    grunt.loadNpmTasks("grunt-contrib-concat");

    var libsToConcatenate = [
        "bower_components/jquery/dist/jquery.js",
        "bower_components/angular/angular.js",
        "bower_components/bootstrap/dist/js/bootstrap.js",
        "bower_components/angular-local-storage/dist/angular-local-storage.js",
        "bower_components/angular-translate/angular-translate.js",
        "bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js",
        "bower_components/angular-sanitize/angular-sanitize.js",
        "bower_components/angular-animate/angular-animate.js",
        "bower_components/angular-aria/angular-aria.js",
        "bower_components/angular-messages/angular-messages.js",
        "bower_components/angular-material/angular-material.js",
        "bower_components/angular-route/angular-route.js",
        "bower_components/moment/moment.js",
        "bower_components/humanize-duration/humanize-duration.js",
        "bower_components/angular-timer/dist/angular-timer.js"
    ];

    var applicationJsFilesToConcatenate = [
        "app/utils.js",
        "lib/html2canvas.js",
        "app/config.js",
        "app/app.js",
        "app/directives.js",
        "app/services.js",
        "app/controllers.js",
        "app/filters.js",
        "app/debugDisabled.js"
    ];

    return {
        options: {
            stripBanners: true
        },
        appJsDist: {
            src: applicationJsFilesToConcatenate,
            dest: options.tmpPath + "/app.js"
        },
        libJsDist: {
            src: libsToConcatenate,
            dest: options.tmpPath + "/lib.js"
        },
        everyJsDist: {
            src: [options.tmpPath + "/lib.min.js", options.tmpPath + "/app.min.js"],
            dest: options.distPath + "/all.min.js"
        },
        appCssDist: {
            src: ["bower_components/angular-material/angular-material.min.css", "css/app.css"],
            dest: options.tmpPath + "/all.css"
        }
    };
};
