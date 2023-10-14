const {src, dest, series} = require('gulp');
const minifyCSS = require('gulp-clean-css');
const rename = require("gulp-rename");

const srcDir = '${src.rootdir}/node_modules/leaflet/';
const destDir = '${webjar.target}/';

function task1() {
    return _copy(['*.md', 'LICENSE'])
}

function task2() {
    return _copy('dist/leaflet.js*', 'dist', path => {
        path.extname = path.extname.replace('.js', '.min.js')
        path.basename = path.basename.replace('.js', '.min.js');
    });
}

function task3() {
    return _copy('dist/leaflet-src.*', 'dist', path => {
        path.basename = path.basename.replace('-src', '');
    });
}

function task4() {
    return _copy('dist/images/**', 'dist/images');
}

function task5() {
    return _minifyCSS('dist/leaflet.css', 'dist');
}

function _toSrc(_src) {
    return src(_src, {allowEmpty: false, cwd: srcDir});
}

function _toDest(_dest) {
    return dest(_dest || '.', {cwd: destDir});
}

function _copy(_src, _dest, _rename) {
    console.log('  Copying ' + _src);

    if (_rename) {
        return _toSrc(_src).pipe(rename(_rename)).pipe(_toDest(_dest))
    } else {
        return _toSrc(_src).pipe(_toDest(_dest))
    }
}

function _minifyCSS(_src, _dest) {
    console.log('  Minifying ' + _src);
    return _toSrc(_src)
        .pipe(_toDest(_dest))
        .pipe(rename(path => path.extname = '.min.css'))
        .pipe(minifyCSS())
        .pipe(_toDest(_dest))
}

exports.default = series(task1, task2, task3, task4, task5);
