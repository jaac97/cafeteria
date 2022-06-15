const {
    src,
    series,
    parallel,
    dest,
    watch
} = require('gulp');
// css
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass')(require('sass'));
// imagenes
const imagemin = require('gulp-imagemin');
const gulpSquoosh = require("gulp-squoosh");
const webp = require('gulp-webp');
const gulpAvif = require('gulp-avif');

const paths = {
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'build/css/'
    },
    images: {
        src: './src/img/**/*',
        webpSrc: './src/img/**/*.{png,jpg}',
        avifSrc: './src/img/**/*.{png,jpg,svg}',
        dest: './build/img/'
    }
}

const css = () => {
    // Compilar sass
    // Pasos 1: Identificar archivos 
    return src(paths.styles.src)
        // Pasos 2: Compilarla
        .pipe(sass({
            // outputStyle: "compressed"
        }))
        .pipe(postcss([autoprefixer]))
        // Pasos 3: Guardar el css
        .pipe(dest(paths.styles.dest))

}

const images = () => {
    return src(paths.images.src)
        .pipe(imagemin({
            optimizationLevel: 5
        }))
        .pipe(dest(paths.images.dest))
}

const webpVersion = () => {
    return src(paths.images.webpSrc)
        .pipe(webp())
        .pipe(dest(paths.images.dest))
}

const avifVersion = () => {
    return src(paths.images.avifSrc)
        .pipe(gulpAvif())
        .pipe(dest(paths.images.dest))
}
const dev = () => {
    watch(paths.styles.src, css)
    watch(paths.images.src, images)
    watch(paths.images.webpSrc, webpVersion)
}


exports.css = css;
exports.images = images;
exports.webpVersion = webpVersion;
exports.avifVersion = avifVersion;
exports.dev = dev;
exports.default = series(images, webpVersion, css, dev);

// series - Se inicia una tarea y cuando finaliza inicia la sigueinte
// parallel - Todas inician al mismo tiempo