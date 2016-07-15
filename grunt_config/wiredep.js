module.exports = function (options, grunt) {

    grunt.loadNpmTasks('grunt-wiredep');

    return {
        task: {
            src: [
                'index.html'
            ]
        }
    }
};
