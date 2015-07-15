'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var gulpRequireSass = require('./');

it ('should properly escape regex', function (cb) {
    //good re
    //(var\s|)\s*\w+\s+=\s+require\((\'|\")[\w.\/]*scss[\w.\/]*(\'|\")\);*\s*/g
    var okayRE = new RegExp('(var\\s|)\\s*\\w+\\s+=\\s+require\\((' + "\\'" + '|\\")[\\w.\\/]*' + 'scss' + '[\\w.\\/]*(' +  "\\'" + '|\\")\\);*\\s*', 'g');
    var goodRE = /(var\s|)\s*\w+\s+=\s+require\((\'|\")[\w.\/]*scss[\w.\/]*(\'|\")\);*\s*/g;
    gutil.log(goodRE.toString());
    gutil.log(okayRE.toString());

    assert.equal(goodRE.toString(), okayRE.toString());
    cb();
});

it('should remove sass requires', function (cb) {

    var testString  = String("/** File Head **/\n\nvar StyleSheet = require(\'./stylesheet.scss\');\n\n/** File Foot **/");
    var resultString = String("/** File Head **/\n\n/** File Foot **/");

    var stream = gulpRequireSass({
        'testString': 'scss',
        'removeLine': true
    });

    stream.on('data', function (file) {
        assert.equal(file.relative, 'common.js');
        assert.equal(resultString, file.contents.toString());
        cb();
    });

    stream.write(new gutil.File({
        path: 'common.js',
        contents: new Buffer(testString)
    }));
});