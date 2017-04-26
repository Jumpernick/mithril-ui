var gulp    = require("gulp"),
  pug     = require("gulp-pug"),
  sass    = require("gulp-sass"),
  concat    = require("gulp-concat"),
  browserSync = require("browser-sync").create()

var dependencies = {
  js: [
    "node_modules/mithril/mithril.js"
  ],
  fonts: [
    "node_modules/font-awesome-4.7.0/fonts/**/*.*"
  ]
}

gulp.task("default", ["pug", "fonts", "sass", "js", "serve", "watch"])

gulp.task("pug", function(){
  return gulp.src("dev/index.pug")
    .pipe(pug())
    .pipe(gulp.dest("www"))
})

gulp.task("sass", function(){
  return gulp.src("dev/sass/index.sass")
    .pipe(sass())
    .pipe(gulp.dest("www/css"))
    .pipe(browserSync.stream())
})

gulp.task("js", function(){
  return gulp.src(dependencies.js.concat(['dev/js/components/init.js', 'dev/js/components/*.js'], "dev/js/index.js"))
    .pipe(concat("mithril-ui.js"))
    .pipe(gulp.dest("www/js"))
})

gulp.task("fonts", function(){
  return gulp.src(dependencies.fonts)
    .pipe(gulp.dest("www/fonts"))
})

gulp.task("watch", function(){
  gulp.watch("dev/*.pug", ["pug"])
  gulp.watch("dev/sass/**/*.sass", ["sass"])
  gulp.watch("dev/js/**/*.js", ["js"]).on("change", browserSync.reload);
})

gulp.task("serve", function(){
  browserSync.init({
    server: "./www"
  })
})