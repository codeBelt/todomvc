const gulp = require('gulp');

gulp.task('buildStatic', (done) => {
    return gulp
        .src([
            env.DIR_SRC + '/assets/media/**/*',
            env.DIR_SRC + '/assets/data/**/*'
            ,env.DIR_SRC + '/db.*'
        ], { base: env.DIR_SRC })
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', reloadBrowser);
});
