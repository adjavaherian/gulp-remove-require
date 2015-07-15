# gulp-remove-require
Gulp plugin to filter out webpack style sass requires (or any atypical node-style requires).

Useful when your project is doing a bunch of these
[Webpack css](http://webpack.github.io/docs/stylesheets.html)

There are only two options:

```javascript

{
    'testString': 'scss', //the token to look for in require path or extension
    'removeLine': true //remove it or ignore it
}

```

Use like so...

```javascript

var gulp        = require('gulp');
var removeRequire = require('gulp-remove-require');

gulp.task('remove-sass-requires', function() {
    return gulp.src(['nastyHobbitsess.js'])
        .pipe(removeRequire())
        .pipe(dest('/tmp/niceHobbitsess.js'));
});

```