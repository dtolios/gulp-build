'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('concatScripts', function () {
    gulp.src([
        'js/global.js',
        'js/circle/autogrow.js',
        'js/circle/circle.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task('minifyScript', function () {
    gulp.src('js/all.js')
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('clean', function () {
    del('dist');
});