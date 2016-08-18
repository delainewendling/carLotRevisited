module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      '../dist/app.js':['../javascript/events.js']
    }, //creates a fill named app.js and takes everything from events.js
    jshint: {
      options: {
        predef: [ "document", "console" ],
        esnext: true,
        globalstrict: true,
        browserify: true
      },
      files: ['../javascript/**/*.js']
    },
    watch: {
      javascripts: {
        files: ['../javascript/**/*.js'],
        tasks: ['jshint', 'browserify']
      }
    },
    jshintrc: './.jshintrc'
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks); //one line of code that loops through all of the dependencies and pulls them in
  grunt.registerTask('default', ['browserify', 'jshint', 'watch']);
}