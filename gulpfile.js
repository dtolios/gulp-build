'use strict';

const gulp       = require('gulp');
const concat     = require('gulp-concat');
const rename     = require('gulp-rename');
const uglify     = require('gulp-uglify');
const sass       = require('gulp-sass');
const cleanCSS   = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const imagemin   = require('gulp-imagemin');
const del        = require('del');
const connect    = require('gulp-connect');

gulp.task('concatScripts', function () {
    return gulp.src('./js/**/*.js')
                .pipe(sourcemaps.init())
                .pipe(concat('all.js'))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', ['concatScripts'], function () {
    return gulp.src('./js/all.js')
                .pipe(uglify())
                .pipe(rename('all.min.js'))
                .pipe(gulp.dest('js'));
});

gulp.task('scripts', ['minifyScripts'], function () {
    return gulp.src('./js/all.min.js')
                .pipe(gulp.dest('dist/scripts'));
});

gulp.task('compileSass', function () {
    return gulp.src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'));
});

gulp.task('minifyCss', ['compileSass'], function () {
    return gulp.src('./css/global.css')
                .pipe(cleanCSS({compatibility: 'ie8'}))
                .pipe(rename('all.min.css'))
                .pipe(gulp.dest('./css'));
});

gulp.task('styles', ['minifyCss'], function () {
    return gulp.src('./css/all.min.css')
                .pipe(gulp.dest('./dist/styles'));
});

gulp.task('images', function () {
    return gulp.src('./images/*')
                .pipe(imagemin([
                        imagemin.jpegtran({ progressive: true }),
                        imagemin.optipng({ optimizationLevel: 5 })
                ]))
                .pipe(gulp.dest('./dist/content'));
});

gulp.task('clean', function () {
    del.sync(['dist', 'js/all*.js*', 'css']);
});

gulp.task('build', ['scripts', 'styles', 'images'], function () {
    return gulp.src(['index.html', 'icons/**'], {base: './'})
            .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', ['styles']);
});

gulp.task('connect', function () {
    connect.server();
});

gulp.task('default', ['clean', 'build', 'watch'], function () {
    gulp.start('connect');
});
