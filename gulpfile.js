'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var _ = require('lodash');
var wrench = require('wrench');
var svgmin = require('gulp-svgmin');
var cheerio = require('gulp-cheerio');
var svgstore = require('gulp-svgstore');
var angularTranslate = require('gulp-angular-translate');

var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');

gulp.task('node', function () {
  nodemon({ script: 'server.js'
           , ext: 'html js'
           , ignore: ['ignored.js']})
    .on('restart', function () {
    console.log('restarted!')
  })
});

/*
    Generate SVG sprite
 */

gulp.task('sprite', function () {
  return gulp
    .src('src/static/vectors/sprite/*.svg')
    .pipe(cheerio({
    run: function ($) {
      $('[fill="none"]').removeAttr('fill');
      $('g[fill="#000000"]').removeAttr('fill');
    },
    parserOptions: { xmlMode: true }
  }))
    .pipe(svgmin())
    .pipe(svgstore())
    .pipe(gulp.dest('src/static/vectors'));
});

var options = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
  errorHandler: function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  }
};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file)(options);
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
