module.exports = function (options, grunt) {
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    return {
        appCssDist: {
            files: {
                'dist/all.min.css': [options.tmpPath + "/all.css"]
            }
        }
    };
};
