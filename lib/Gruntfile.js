module.exports = function(grunt) {

  grunt.initConfig({
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
        tasks: ['jshint']
      }
    },
    jshintrc: './.jshintrc'
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks); //one line of code that loops through all of the dependencies and pulls them in
  grunt.registerTask('default', ['jshint', 'watch']);
}