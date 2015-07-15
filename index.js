//gulp-remove-require/index.js
//regex requires, [optionally remove]
//useful for pre-processing webpack style "enhanced" requires

var through = require('through2');
var gutil = require('gulp-util');

// Consts
const PLUGIN_NAME = 'gulp-remove-require';

function processRequires(fileString, opts) {

    var newFile = fileString;

    if (opts.testString.length >= 1) {
        var testString = String(opts.testString) || 'sass';

        //proper re
        //(var\s|)\s*\w+\s+=\s+require\((\'|\")[\w.\/]*scss[\w.\/]*(\'|\")\);*\s*/g
        var re = new RegExp('(var\\s|)\\s*\\w+\\s+=\\s+require\\((' + "\\'" + '|\\")[\\w.\\/]*' + testString + '[\\w.\\/]*(' +  "\\'" + '|\\")\\);*\\s*', 'g');
        //gutil.log(re.toString());

        if (opts.removeLine) {
            newFile = fileString.replace(re, '');
            //gutil.log('removing line\n', newFile);
        }
    }

    return newFile;
}

// Plugin level function(dealing with files)
function gulpRemoveRequire(opts) {

    opts = opts || {};

    // Creating a stream through which each file will pass
    return through.obj(function(file, enc, cb) {
        // if null, buffer or stream
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-remove-require', 'Streaming not supported'));
            return;
        }

        if (file.isBuffer()) {
            //gutil.log('file isBuffer');
            file.contents = new Buffer(processRequires(file.contents.toString(), opts));
        }

        cb(null, file);

    });

}

// Exporting the plugin main function
module.exports = gulpRemoveRequire;