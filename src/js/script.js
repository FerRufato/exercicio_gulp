import gulp from 'gulp';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import optipng from 'imagemin-optipng';
import gifsicle from 'imagemin-gifsicle';
import svgo from 'imagemin-svgo';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';

const sass = gulpSass(dartSass);

// Tarefa para otimizar imagens
function optimizeImages() {
  return gulp.src('src/imagens/*')
    .pipe(imagemin([
      gifsicle({ interlaced: true }),
      mozjpeg({ quality: 75, progressive: true }),
      optipng({ optimizationLevel: 5 }),
      svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(gulp.dest('dist/imagens'));
}

// Tarefa para compilar Sass para CSS
function compileSass() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
}

// Tarefa para minificar JavaScript
function minifyJs() {
  return gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
}

// Registrando as tarefas no Gulp
gulp.task('images', optimizeImages);
gulp.task('sass', compileSass);
gulp.task('js', minifyJs);
gulp.task('default', gulp.series('sass', 'images', 'js'));