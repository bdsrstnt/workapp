module.exports = function (options, grunt) {

    grunt.loadNpmTasks("grunt-injector");

    var configObject = {
       options: {
           addRootSlash: false
       },
       appJsDist: {
            options: {
                template: "index.start.html",
                ignorePath: "dist"
            },
            files: {
                "dist/index.html": ["dist/all.min.js", "dist/all.min.css"]
            }
       }
    };
    return configObject;
};
