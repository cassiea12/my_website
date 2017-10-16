var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var uncss = require('gulp-uncss');
var  autoprefixer = require('gulp-autoprefixer');
var csslint = require('gulp-csslint');
var htmlhint = require('gulp-htmlhint');
var popperjs = require('popper.js');

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

// Development Tasks
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
});

gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'app/scss/**/*.scss']) // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
        .pipe(uncss({ //removes unused css
            html: [
                'app/index.html'
                ],
            ignore: [
                /\.fade/,
                /\.modal/,
                '.affix',
                /\.tooltip/,
                /\.popover/,
                /\.collaps/,
                /\.carousel/
            ]
        }))
        .pipe(autoprefixer(autoprefixerOptions)) // auto adds vendor prefixes
        .pipe(csslint()) // lints css
        .pipe(csslint.formatter())
        .pipe(gulp.dest('app/css')) // Outputs it in the css folder
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});

gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(htmlhint()) //lints html
        .pipe(htmlhint.reporter())
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});


gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js','node_modules/popper.js/dist/umd/popper.js'])
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});

// Watchers
gulp.task('watch', ['browserSync'], function() {
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'app/scss/**/*.scss'], ['sass']);
    gulp.watch('app/*.html', ['html' , 'sass']);
    gulp.watch('app/js/custom.js', ['js']);
});

gulp.task('default', function(callback) {
    runSequence(['html','js', 'sass'], 'watch',
        callback
    )
});

// Optimization Tasks
// ------------------

// Optimizing CSS and JavaScript
gulp.task('useref', function() {

    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify())) //minification
        .pipe(gulpIf('*.css', cssnano())) // minification
        .pipe(gulp.dest('dist'));
});

// Optimizing Images
gulp.task('images', function() {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true,
        })))
        .pipe(gulp.dest('dist/images'))
});

// Copying fonts
gulp.task('fonts', function() {
    return gulp.src(['app/fonts/**/*','node_modules/font-awesome/fonts/*'])
        .pipe(gulp.dest('dist/fonts'))
});

// Copying pdfs
gulp.task('pdf', function() {
    return gulp.src(['app/pdf/**/*'])
        .pipe(gulp.dest('dist/pdf'))
});

// Cleaning
gulp.task('clean', function() {
    return del.sync('dist').then(function(cb) {
        return cache.clearAll(cb);
    });
});

gulp.task('clean:dist', function() {
    return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Build Sequences
// ---------------

gulp.task('build', function(callback) {
    runSequence(
        'clean:dist',
        'js',
        'sass',
        ['useref', 'images', 'fonts', 'pdf'],
        callback
    )
});