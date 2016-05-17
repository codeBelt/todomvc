const gulp = require('gulp');

gulp.task('buildVendor', (done) => {
    return gulp
        .src(`${ global.env.DIR_SRC }/assets/vendor/**/*.js`)
        .pipe(gulp.dest(`${ global.env.DIR_DEST }/assets/vendor/`));
});
