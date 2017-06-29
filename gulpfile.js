'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('concatScripts', function () {
    return gulp.src('js/**/*.js')
                .pipe(sourcemaps.init())
                .pipe(concat('all.js'))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('dist/scripts'));
});

gulp.task('minifyScripts', function () {
    return gulp.src('dist/scripts/all.js')
                .pipe(sourcemaps.init())
                .pipe(uglify())
                .pipe(rename('all.min.js'))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('dist/scripts'));
});

gulp.task('compileSass', function () {
    return gulp.src('sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('clean', function () {
    del('dist');
});

// [
//     'js/global.js',
//     'js/circle/autogrow.js',
//     'js/circle/circle.js'
// ]