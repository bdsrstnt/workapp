module.exports = function(grunt) {
    var options = require("./package.json");
    var loadConfig = function(module) {
        return require("./grunt_config/" + module)(options, grunt);
    };

    options.distPath = "dist";
    options.tmpPath = "build_tmp";

    // loads grunt modules which are needed
    grunt.initConfig({
        pkg: options,
        concat: loadConfig("concat"),
        uglify: loadConfig("uglify"),
        inline_angular_templates: loadConfig("injectHtml"),
        clean: loadConfig("clean"),
        copy: loadConfig("copy"),
        cssmin: loadConfig("cssmin"),
        jsonmin: loadConfig("jsonmin"),
        injector: loadConfig("inject"),
        wiredep: loadConfig("wiredep"),
        connect: loadConfig("connect")
    });

    grunt.registerTask("build_min", ["clean", "copy", "jsonmin:appJsonDist", "concat:appJsDist", "concat:libJsDist", "uglify", "concat:everyJsDist", "concat:appCssDist", "cssmin:appCssDist", "injector:appJsDist", "inline_angular_templates:distHtml"]);
    grunt.registerTask("connect_min", ["build_min", "connect"]);
};
