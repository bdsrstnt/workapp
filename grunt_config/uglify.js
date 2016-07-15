module.exports = function (options, grunt) {
    grunt.loadNpmTasks("grunt-contrib-uglify");
    return {
        options: {
            stripBanners: true,
            mangle: false
        },
        appJsDist: {
            src: options.tmpPath + "/app.js",
            dest: options.tmpPath + "/app.min.js"
        },
        libJsDist: {
            src: options.tmpPath + "/lib.js",
            dest: options.tmpPath + "/lib.min.js"
        }
    };
};
