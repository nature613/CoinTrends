// Summary of commands
//  gulp watch:
//    Initiate browser-sync (live-reload),
//    Watch html/scss/css/js files,
//    Compile watched .scss files into .css files on save,
//    Refresh browser-sync on saving watched files.
//
//  gulp build:
//    Delete contents of public/ ready for rebuild,
//    Compile all .scss files into .css files,
//    Concatenate and minify .css files and copy into public/assets/,
//    Concatenate and minify .js files and copy into public/assets/,
//    Publish index.html and other .html files into public/,
//    Copy images from dev/assets/images/ into public/assets/images/.
//

// requires:
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify-es').default;
var gulpIf = require('gulp-if');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var del = require('del');
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
gulp.task('watch', gulp.parallel('browserSync', 'sass', function(){
  gulp.watch('dev/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('dev/*.html', browserSync.reload);
  gulp.watch('dev/js/**/*.js', browserSync.reload);
}));

// // //                                              // // //



// // // 'gulp build' tasks including concatenating & minifying .js and .css files // // // 
// // also depends on 'gulp sass', from gulp watch section above

// clear:public - deletes everything in public/ directory, to clean up unused files before public/ can be rebuilt
gulp.task('clear:public', function(done) {
  del.sync(['public/**/*', 'public/js/**', '!public']); //must ignore parent directory if you don't want it to be deleted too
  done();
});

// useref - copies html files from dev/ to public/,
//   also concatenates and minifies .css and .js files, and places resulting files in public/assets/
gulp.task('useref', function(){
  var plugins = [
      autoprefixer(),
      cssnano()
  ];
  return gulp.src('dev/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', postcss(plugins)))
    .pipe(gulp.dest('public'));
});

// images - copies images from dev/images/ to public/images/
//   separate function in case I need to replace this with imagemin in the future, to compress images.
//   currently not planning on having any large images in this project, though.
gulp.task('images', function(){
  return gulp.src('dev/assets/images/*')
    .pipe(gulp.dest('public/assets/images'));
});


// build - runs a sequence of gulp tasks to rebuild public/:
//   Compile sass, copy html to public/ & concatenate/minify .css/.js, copy images to public/assets
gulp.task('build', gulp.series('clear:public',
  gulp.parallel('sass', 'useref', 'images')
));

// // //                                                                       // // //