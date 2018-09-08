// Summary of commands
//  gulp watch:
//    Initiate browser-sync,
//    Watch html/css/js files,
//    Compile watched .scss files into .css files on save,
//    Refresh browser-sync on saving watched files.
//
//  gulp build:
//    Delete contents of public/ ready for rebuild,
//    Compile all .scss files into .css files and copy .css into public/assets/,
//    Concatenate and minify .css files and publish index.html into public/,
//    Copy images from dev/assets/images/ into public/assets/images/.
//    

// requires:
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify-es').default;
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
//var envify = require('envify/custom')
//

// // // 'gulp watch' tasks including preprocessing css // // // 

// browserSync - initiates browserSync
gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'dev'
    },
    port: 8081
  });
});

// sass - compiles sass files into css, and re-injects css into browserSync window
gulp.task('sass', function(){
  return gulp.src('dev/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dev/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// watch - watches html/css/js files in dev/**/*, and reloads browserSync when any watched file is saved
//   when a watched scss file is saved, all scss files are compiled into css files
gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('dev/scss/**/*.scss', ['sass']);
  gulp.watch('dev/*.html', browserSync.reload);
  gulp.watch('dev/js/**/*.js', browserSync.reload);
});

// // //                                              // // //



// // // 'gulp build' tasks including concatenating & minifying .js and .css files // // // 
// // also depends on 'gulp sass', from gulp watch section above

// clear:public - deletes everything in public/ directory, to clean up unused files before public/ can be rebuilt
gulp.task('clear:public', function() {
  return del.sync(['public/**/*', 'public/js/**', '!public']); //must ignore parent directory if you don't want it to be deleted too
});

// useref - copies html files from dev/ to public/,
//   also concatenates and minifies .css and .js files, and places resulting files in public/assets/
gulp.task('useref', function(){
  return gulp.src('dev/*.html')
    .pipe(useref())
    //.pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('public'));
});

// images - copies images from dev/images/ to public/images/
//   separate from gulp fonts, in case I want to replace this with imagemin in the future, to compress images.
//   currently not planning on having any large images in this project, though.
gulp.task('images', function(){
  return gulp.src('dev/assets/images/*')
    .pipe(gulp.dest('public/assets/images'));
});

// scripts - copies .js files from dev/js/ to public/js/
gulp.task('scripts', function(){
  return gulp.src('dev/js/**/*')
    .pipe(gulp.dest('public/js'));
})

// build - runs a sequence of gulp tasks to rebuild public/:
//   Compile sass, copy html to public/ & concatenate/minify .css/.js, copy images and fonts to public/assets
gulp.task('build', function (callback) {
  runSequence('clear:public',
    ['sass', 'scripts', 'useref', 'images'],
    callback
  );
});

// // //                                                                       // // //