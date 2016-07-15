module.exports = function (options, grunt) {

    grunt.loadNpmTasks("grunt-contrib-clean");

    return [
        "dist", "build_tmp"
    ]
};
