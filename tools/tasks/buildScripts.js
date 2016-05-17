const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const notify = require('gulp-notify');
const watchify = require('watchify');
const buffer = require('vinyl-buffer');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const aliasify = require('aliasify');

gulp.task('buildScripts', done => {
    console.log('buildScripts');
    return build(false, done);
});

gulp.task('watchScripts', done => {
    console.log('watchScripts');
    return build(true, done);
});

function build(isWatch, done) {
    const plugins = [];

    if (isWatch) {
        plugins.push(watchify);
    }

    // prevent relative path hell by setting base path. This allows import('path/file')
    const bundler = browserify({
        cache: {},
        packageCache: {},
        plugin: plugins,
        debug: true,
        entries: [env.DIR_SRC + '/assets/scripts/main.js']
    })
        .transform('babelify', {
            presets: ['es2015'],
            plugins: [
                'transform-class-properties',
                'transform-async-to-generator',
                'transform-runtime'
            ]
        });

    const onUpdate = () => {
        return bundler
            .transform(aliasify.configure({
                aliases: pkg.aliases
            }))
            .bundle()
            .on('error', function(error) {
                console.error(error.message);
                this.emit('end');
            })
            .on('error', notify.onError({
                title: '<%= error.name %>',
                message: 'Line <%= error.line %>, <%= error.message %>'
            }))
            .pipe(source('main.js'))
            .pipe(buffer())
            // .pipe(gulpIf(global.env.SOURCE_MAPS, sourcemaps.init({ loadMaps: true })))
            // .pipe(gulpIf(global.env.MINIFY, uglify()))
            // .pipe(gulpIf(global.env.SOURCE_MAPS, sourcemaps.write('./')))
            .pipe(gulp.dest(`${global.env.DIR_DEST}/assets/scripts/`))
            .pipe(reloadBrowser({ stream: true }))
    };

    bundler.on('update', () => {
        console.log('Scripts: file update detected, rebuilding...');
        onUpdate();
    });

    bundler.on('log', message => {
        gulp.src('Gulpfile.js')
            .pipe(gulpIf(isWatch, notify({ message, title:'Scripts complete' })));
    });

    return onUpdate();
}
