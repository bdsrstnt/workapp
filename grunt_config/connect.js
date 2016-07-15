module.exports = function (options, grunt) {

	grunt.loadNpmTasks('grunt-contrib-connect');

    return {server: {
      options: {
        port: 8000,
        keepalive: true,
        base: ''
      },
    }}
};
