let preprocessor = 'sass';

const {src, dest, parallel, series, watch} = require('gulp');

const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagecompress = require('compress-images');
const del = require('del');

function browsersync() {
    browserSync.init({
        server: {baseDir: 'src/'},
        notify: false,
        online: true
    })
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
        'src/js/app.js',
    ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(dest('src/js/'))
        .pipe(browserSync.stream())
}

function startwatch() {
    watch(['src/**/*.js', '!src/**/*.min.js'], scripts);
    watch('src/**/' + preprocessor + '/**/*', styles);
    watch('src/**/*.html').on('change', browserSync.reload);
    watch('src/images/src/**/*', images);
}

function styles() {
    return src([
        "node_modules/ion-rangeslider/css/ion.rangeSlider.css",
        'src/sass/main.scss'
    ])
        .pipe(eval(preprocessor)())
        .pipe(concat('app.min.css'))
        .pipe(autoprefixer({overrideBrowserslist: ['last 10 version'], grid: true}))
        .pipe(cleancss({level: {1: {specialComments: 0}}}))
        .pipe(dest('src/css/'))
        .pipe(browserSync.stream())
}

async function images() {
    imagecompress(
        'src/images/src/**/*',
        'src/images/prepared/',
        {compress_force: false, statistic: true, autoupdate: true},
        false,
        {jpg: {engine: "mozjpeg", command: ["-quality", "80"]}}, // Сжимаем и оптимизируем изображеня
        {png: {engine: "pngquant", command: ["--quality=80-100", "-o"]}},
        {svg: {engine: "svgo", command: "--multipass"}},
        {gif: {engine: "gifsicle", command: ["--colors", "64", "--use-col=web"]}},
        function (err, completed) {
            if (completed === true) {
                browserSync.reload()
            }
        }
    )
}

function cleanimages() {
    return del('src/images/prepared/**/*', {force: true})
}

function buildcopy() {
    return src([
        'src/css/**/*.min.css',
        'src/js/**/*.min.js',
        'src/images/prepared/**/*',
        'src/**/*.html',
    ], {base: 'src'})
        .pipe(dest('dist'))
}

function cleandist() {
    return del('dist/**/*', { force: true }) // Удаляем все содержимое папки "dist/"
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimages = cleanimages;
exports.build = series(cleandist, styles, scripts, images, buildcopy);
exports.default = parallel(styles, scripts, browsersync, startwatch);

