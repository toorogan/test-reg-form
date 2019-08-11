const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const rename = require('gulp-rename');
const minify = require('gulp-csso');
const babel = require('gulp-babel');
const del = require('del');
const minifyjs = require('gulp-minify');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const twig = require('gulp-twig');
const server = require('browser-sync')
const svgo = require('gulp-svgo');

gulp.task('clear-build', () => {
    return del('build');
})
gulp.task('clear-dist', () => {
    return del('dist');
})



gulp.task('build', ['clear-build'], () => {
    
    gulp.src('src/scss/style.scss').
        pipe(plumber()).
        pipe(sass()).
        pipe(postcss([
            autoprefixer(),
                mqpacker({sort: true})
            ])).
        pipe(minify()).
        pipe(rename('style.css')).
        pipe(gulp.dest('build/assets/css'));
    gulp.src('src/js/main.js').
        pipe(plumber()).
        pipe(babel({
            presets: ['@babel/env']
        })).
        pipe(uglify()).
        pipe(rename('script.js')).
        pipe(gulp.dest('build/assets/js'));  
    gulp.src(`src/img/**/*.{jpg,png,gif}`).
            pipe(plumber()).
            pipe(imagemin([
            imagemin.optipng({optimizationLevel: 2}),
            imagemin.jpegtran({progressive: true})
            ])).
            pipe(gulp.dest(`build/assets/img`));
    gulp.src(`src/twig/pages/*.twig`).
        pipe(plumber()).
        pipe(twig()).
        pipe(gulp.dest('build/'));
    gulp.src(`src/img/svg/*.svg`).
        pipe(plumber()).
        pipe(svgo()).
        pipe(gulp.dest('build/assets/img/svg/'));

})

//style
gulp.task('style', () => {
    return gulp.src('src/scss/style.scss').
        pipe(plumber()).
        pipe(sass()).
        pipe(postcss([
            autoprefixer(),
                mqpacker({sort: true})
            ])).
        
        pipe(rename('style.css')).
        pipe(gulp.dest('dist/assets/css'));
});
gulp.task('scripts', () => {
    return  gulp.src('src/js/main.js').
        pipe(plumber()).
        pipe(babel({
            presets: ['@babel/env']
        })).
        pipe(rename('script.js')).
        pipe(gulp.dest('dist/assets/js'));

})
gulp.task('imgs', () => {
    return  gulp.src('src/img/**/*.{jpg,png,gif,svg}').
        pipe(plumber()).
        pipe(gulp.dest('dist/assets/img')); 
})

gulp.task('twig', function(done) {
        gulp.src(`src/twig/pages/*.twig`).
        pipe(plumber()).
        pipe(twig()).
        pipe(gulp.dest('dist/'));
    done();
})

gulp.task('svgo', () => {
    return gulp.src(`src/img/svg/*.svg`).
        pipe(plumber()).
        pipe(svgo()).
        pipe(gulp.dest('dist/assets/img/svg'));
})


gulp.task('style-whatch', ['style'], (done) => {
    server.reload();
    done();
})
gulp.task('twig-whatch', ['twig'], (done) => {
    server.reload();
    done();
})
gulp.task('img-whatch', ['imgs', 'svgo'],  (done) => {
    server.reload();
    done();
})
gulp.task('scripts-whatch', ['scripts'], (done) => {
    server.reload();
    done();
})
gulp.task('dev', ['clear-dist'], () => {
    gulp.start('twig', 'style', 'scripts', 'imgs', 'svgo');
    server.init({
        server: `./dist`,
        notify: false,
        open: true,
        port: 3555,
        ui: false
      });
      gulp.watch(`src/scss/**/*.{scss,sass}`, [`style-whatch`]);
      gulp.watch(`src/twig/**/*.twig`, [`twig-whatch`]);
      gulp.watch(`src/js/**/*.js`, [`scripts-whatch`]);
      gulp.watch(`src/img/**/*.*`, [`img-whatch`, ]);
    
})