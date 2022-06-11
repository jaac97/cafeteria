const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const {
    src,
    series,
    parallel,
    dest,
    watch
} = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// paths
const paths = {
    styles: {
        src: 'src/scss/*.scss',
        dest: './build/css/'
    }
}

const css = (done) => {
    // Compilar sass
            // Pasos 1: Identificar archivos 
    return src(paths.styles.src)
        // Pasos 2: Compilarla
        .pipe(sass())
        .pipe( postcss([autoprefixer]) )
        // Pasos 3: Guardar el css
        .pipe(dest(paths.styles.dest))
        done()
}

const dev = () => {
    watch(paths.styles.src, css)
}

const tareaDefault = () => {
    console.log("Algo")
}
exports.css = css;
exports.dev = dev;
exports.default = series(css, dev);

// series - Se inicia una tarea y cuando finaliza inicia la sigueinte
// parallel - Todas inician al mismo tiempo