module.exports = function (options, grunt) {

    grunt.loadNpmTasks("grunt-contrib-copy");

    return {
        dist: {
            files: [
                {
                    expand: true,
                    src: ["index.html"],
                    dest: "dist/",
                    filter: "isFile"
                },
                {
                    expand: true,
                    src: ["donate.html"],
                    dest: "dist/",
                    filter: "isFile"
                },
                {
                    src: ["lang/en.json"],
                    dest: "dist/lang/en.json",
                    filter: "isFile"
                },
                {
                    src: ["css/Solari.ttf"],
                    dest: "dist/Solari.ttf",
                    filter: "isFile"
                },
                {
                    src: ["css/Caviar_Dreams_Bold.ttf"],
                    dest: "dist/Caviar_Dreams_Bold.ttf",
                    filter: "isFile"
                },
                {
                    expand: true,
                    src: "img/*",
                    dest: "dist",
                    filter: "isFile"
                }
            ]
        }
    }
};