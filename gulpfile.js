'use strict';

    var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css'),
    rimraf = require('rimraf'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    browserSync = require("browser-sync"),
    htmlmin = require('gulp-htmlmin'),
    babel = require('gulp-babel'),
    reload = browserSync.reload;

    var path = {
   
        dist: { 
            html: 'dist/',
            js: 'dist/js/',
            img: 'dist/img/',
            css: 'dist/css/'
        },
        app: { 
            html: 'app/*.html', 
            js: 'app/js/*.js',
            css: 'app/css/*.css',
            img: 'app/img/*.png'            
        },
        watch: { 
            html: 'app/**/*.html',
            js: 'app/js/**/*.js',
            css: 'app/css/**/*.css',
            img: 'app/img/*.png'
        },
        clean: './dist'
    };

    
var config = {
    server: {
        baseDir: "./dist"
    },
    tunnel: true,
    host: 'localhost',
    port: 8081,
    logPrefix: "Ola"
};

gulp.task('html:build', function () {
    gulp.src(path.app.html)
        .pipe(htmlmin())
        .pipe(gulp.dest(path.dist.html)) 
        .pipe(reload({stream: true})); 
});

gulp.task('js:build', function () {
    gulp.src(path.app.js) 
        .pipe(sourcemaps.init()) 
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify()) 
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest(path.dist.js)) 
        .pipe(reload({stream: true})); 
});

gulp.task('css:build', function () {
    gulp.src(path.app.css) 
        .pipe(sourcemaps.init()) 
        .pipe(gulp.dest(path.dist.css)) 
        .pipe(reload({stream: true}));
});

gulp.task('img:build', function () {
    gulp.src(path.app.img) 
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.dist.img)) 
        .pipe(reload({stream: true}));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'css:build',
    'img:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('img:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});


gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


gulp.task('default', ['build', 'webserver', 'watch']);
