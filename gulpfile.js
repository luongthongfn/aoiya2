var gulp = require('gulp'),
    sass = require('gulp-sass'),
    bulkSass = require('gulp-sass-bulk-import'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    includeTag = require('gulp-include-tag'),
    browserSync = require('browser-sync').create(),
    htmlbeautify = require('gulp-html-beautify'),
    gutil = require('gulp-util'),

    babel = require('gulp-babel'),
    rename = require("gulp-rename"),

    rootProjectPath = '', /*path from root*/
    currentPath = '.',
    sassPath,
    cssPath,
    cssDestPath,
    imgPath,
    htmlPath,
    jsPath;
    var browserify = require('gulp-browserify');


/*======================================================================= TASK ====*/

//get path frome agrument when call task ___ eg:  $ gulp -p t5/adone
gulp.task('setPath', function () {
    // console.log("~~",process.argv,'~~');
    rootProjectPath = rootProjectPath + process.argv[3];
    sassPath        = (currentPath || rootProjectPath) + '/scss/**/*.scss';
    includePath     = (currentPath || rootProjectPath) + '/layouts/**/*.html';
    cssPath         = (currentPath || rootProjectPath) + '/css/**/*/.css';
    cssDestPath     = (currentPath || rootProjectPath) + '/css';
    imgPath         = (currentPath || rootProjectPath) + '/img';
    htmlPath        = (currentPath || rootProjectPath) + '/*.{html,htm}';
    jsPathSrc          = (currentPath || rootProjectPath) + '/js/src/*.js';
    jsPath          = (currentPath || rootProjectPath) + '/js/*.js';
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src(sassPath)
        .pipe(bulkSass())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 version', '> 5%']
        }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(cssDestPath))
        .pipe(browserSync.stream());
});


gulp.task('include', function () {
    return gulp.src('./layouts/page/*.html')
        .pipe(includeTag()).on('error',gulti.log)
        .pipe(htmlbeautify({
            indentSize: 4
        }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

//js
function handleError (error) {
    console.log(error.toString());
    this.emit('end');
}
gulp.task('babel', () =>
    gulp.src('./js/src/*.js')
        .pipe(browserify({
            global : true
        })).on('error', gutil.log)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env'],
            minified: true,
            comments: false
        })).on('error', gutil.log)
        // .pipe(rename("custom.js"))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.stream())
);

// watch
gulp.task('watch', ['setPath', 'sass', 'babel',  'include'], function () {
    // Static Server + watching scss/html/js files
    browserSync.init({
        server: currentPath || rootProjectPath,
        reloadDelay: 500
    });

    gulp.watch(sassPath, ['sass']);
    gulp.watch(jsPathSrc, ['babel']);
    gulp.watch(includePath, ['include']);
    // gulp.watch(cssPath).on('change', browserSync.reload);
    gulp.watch(sassPath).on('change', browserSync.reload);
    gulp.watch(imgPath).on('change', browserSync.reload);
    // gulp.watch(htmlPath).on('change', browserSync.reload);
    gulp.watch(jsPathSrc).on('change', browserSync.reload);

});

gulp.task('build', ['setPath', 'sass', 'babel', 'include']);
gulp.task('default', ['watch']);