module.exports = function (options, grunt) {
    grunt.loadNpmTasks("grunt-jsonmin");
    return {
        appJsonDist: {
            options: {},
            files: {
                "dist/lang/en.json" : "lang/en.json"
            }
        }
    }
};
