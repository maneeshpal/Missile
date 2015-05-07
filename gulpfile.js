var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    del = require('del'),
    to5 = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps');

var paths = {
    scss: 'static/style/**/*.scss',
    js: 'static/js/src/**/*.js',
    libJs: 'static/js/lib/**/*.js',
    build: {
        js: 'public/js/',
        css: 'public/style/',
        jsLib: 'public/js/lib/'
    }
};

gulp.task('transpile:scss', function () {
    return gulp.src(paths.scss)
        .pipe(sass({
            style: 'expanded',
            errLogToConsole: true,
            includePaths: [ 'static/style/lib/foundation/scss' ]
        }))
        .pipe(rename(function(path){
            if(path.dirname.indexOf('foundation') > 0) {
                path.dirname = 'lib/foundation'
            }
        }))
        .pipe(gulp.dest(paths.build.css));
});

gulp.task('clean:css', function (cb) {
    del([paths.build.css], { force: true }, cb);
});

gulp.task('watch:scss', function () {
    gulp.watch(paths.scss, ['transpile:scss']);
});

gulp.task('transpile:js', function () {
    return gulp.src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(to5({ modules: 'ignore' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.js));
});

// gulp.task('transpileServer:js', function () {
//     return gulp.src(paths.jsServer)
//         .pipe(to5({ modules: 'ignore' }))
//         .pipe(gulp.dest(paths.build.js));
// });

gulp.task('lib:js', function () {
    gulp.src(paths.libJs)
        .pipe(gulp.dest(paths.build.jsLib));
});

gulp.task('watch:js', function () {
    gulp.watch(paths.js, ['transpile:js']);
    gulp.watch(paths.libJs, ['lib:js']);
});

gulp.task('clean:js', function (cb) {
    del([paths.build.js], { force: true }, cb);
});

gulp.task('default', ['transpile:scss', 'transpile:js', 'lib:js']);
gulp.task('watch', ['default', 'watch:scss', 'watch:js']);
gulp.task('clean', ['clean:js', 'clean:css']);