var gulp = require("gulp"),
	sass = require("gulp-ruby-sass"),
	browsersync = require("browser-sync"),
	sourcemap = require("gulp-sourcemaps"),
	reload = browsersync.reload;

var path = {
	"css_input" : "src/sass/main.scss",
	"css_output": "build/css/",
	"css_watch" : "src/sass/**/*.scss"
};

gulp.task("sass", function() {
	return sass(path.css_input,{
		sourcemap : true,
		style : "nested"
	})
	.on("error", function(err) {
		console.log("error",err);
	})
	.pipe(sourcemap.write("maps",{
		includeContent : true,
		sourceRoot : "./src/**/*.scss"
	}))
	.pipe(gulp.dest(path.css_output))
	.pipe(browsersync.stream());
});

gulp.task("html", function() {
	
});

gulp.task("browsersync", function() {
	browsersync.init({
		server : {
			baseDir : "./build/"
		}
	})
});



gulp.task("watch", function() {
	gulp.watch([path.css_watch],["sass"],reload);
	gulp.watch(["./build/*.html"],reload);
});
gulp.task("default", ["sass","browsersync","watch"]);