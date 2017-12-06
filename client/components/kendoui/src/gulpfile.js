/* jshint browser:false, node:true, esnext: true */

let gulp = require('gulp');
let debug = require('gulp-debug'); // jshint ignore:line
let logger = require('gulp-logger');
let filter = require('gulp-filter');
let util = require('gulp-util');
let sourcemaps = require('gulp-sourcemaps');
let concat = require('gulp-concat');
let lazypipe = require('lazypipe');
var uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let replace = require('gulp-replace');
let foreach = require('gulp-foreach');
let amdOptimize = require('amd-optimize');
var argv = require('yargs').argv;

let less = require('gulp-less');
let autoprefix = require('less-plugin-autoprefix');
let minifyCSS = require('gulp-minify-css');
let cache = require('gulp-cached');
let progeny = require('gulp-progeny');
let clone = require('gulp-clone');
let gulpIf = require('gulp-if');
let merge = require('merge2');

let makeSourceMaps = !argv['skip-source-maps'];

let browsers = [
  'explorer >= 8',
  'chrome >= 21',
  'firefox esr',
  'opera >= 15',
  'android >= 2.3',
  'safari >= 6.2.6',
  'explorermobile >= 10',
  'ios >= 6',
  'blackberry >= 10',
].join(',');

let cleanCssOptions = {
  compatibility: 'ie7',
  aggressiveMerging: false,
  advanced: false,
};

let fromLess = lazypipe()
  .pipe(logger, { after: 'LESS complete!', extname: '.css', showChange: true })
  .pipe(less, { relativeUrls: true, plugins: [new autoprefix({ browsers })] })
  .pipe(replace, /\.\.\/mobile\//g, ''); // temp hack for the discrepancy between source and generated "source"

let minify = lazypipe()
  .pipe(logger, { after: 'Min CSS complete!', extname: '.min.css', showChange: true })
  .pipe(minifyCSS, cleanCssOptions)
  .pipe(rename, { suffix: '.min' });

let cacheLessDependencies = lazypipe()
  .pipe(cache, 'less')
  .pipe(progeny, {
    regexp: /^\s*@import\s*(?:\(\w+\)\s*)?['"]([^'"]+)['"]/,
  });

var argv = require('yargs').argv;

// uglify
let compress = {
  unsafe: true,
  hoist_vars: true,
  warnings: true,
  pure_getters: true,
};

let mangle = {
  except: ['define'],
};

function renameModules(match) {
  return match.replace(/['"]([\w\.\-\/]+)?['"]/g, (_, module) => {
    return module == "jquery" ? '"jquery"' : `"${module}.min"`
  });
}

var uglify = lazypipe()
  .pipe(logger, { after: 'uglify complete', extname: '.min.js', showChange: true })
  .pipe(uglify, { compress, mangle, preserveComments: 'license' })
  .pipe(replace, /define\(".+?\]/g, renameModules)
  .pipe(rename, { suffix: '.min' });


// AMD gathering

function gatherCustomAmd(stream, file) {
  let moduleId = file.path.match(/kendo\.(.+)\.js/)[1];

  console.log(moduleId);
  return stream.pipe(amdOptimize(`kendo.${moduleId}`, {
    baseUrl: 'js',
    exclude: ['jquery'],
  }));
}

let gatherCustom = lazypipe()
  .pipe(foreach, gatherCustomAmd);

gulp.task('custom', () => {
    var files = argv.c;

    if (files.indexOf(",") == -1) {
        throw new util.PluginError({
            task: "custom",
            plugin: "custom",
            message: "please specify more than one component"
        });
    }
    if (!files) {
        throw new util.PluginError({
            task: "custom",
            plugin: "custom",
            message: "please provide a list of the components to be included in the build with -c, separated with ','"
        });
    }

    var included = [];
    return gulp.src(`../../../components/kendoui/js/kendo.{${files}}.js`, { base: "js" })
            .pipe(gatherCustom())
            .pipe(filter(function(file) {
                if (included.indexOf(file.path) === -1) {
                    included.push(file.path);
                    return true;
                }  else {
                    return false;
                }
            }))
            .pipe(concat({path: '../../../components/kendoui/js/kendo.custom.js', base: 'js'}))
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(logger({after: 'source map complete!', extname: '.map', showChange: true}))
            .pipe(sourcemaps.write("./"))
            .pipe(gulp.dest("../../../components/kendoui/js"));
});

gulp.task('less', () => {
    var css = gulp.src(`styles/${argv.styles || '**/kendo*.less'}`, { base: "styles" })
        .pipe(fromLess());

    var minCss = css.pipe(clone())
        .pipe(gulpIf(makeSourceMaps, sourcemaps.init()))
        .pipe(minify())
        .pipe(gulpIf(makeSourceMaps, sourcemaps.write("./")));

    return merge(css, minCss)
        .pipe(gulp.dest('../../../components/kendoui/styles'));
});
