'use strict';

const babel = require('gulp-babel');
const gulpIf = require('gulp-if');
const htmlmin = require('gulp-htmlmin');
const combine = require('stream-combiner');
const minifyCss = require('gulp-minify-css');
const uglify = require('gulp-uglify');

const size = require('gulp-size');
const gutil = require('gulp-util');

function logError(err) {
	gutil.log(gutil.colors.red('[Error]'), err.toString());
	this.emit('end');
}

module.exports = combine(
	// Convert ES6 -> ES5 code for IE11
	gulpIf('*.js', babel({
		presets: [ [ 'es2015', { modules: false } ] ],
		compact: true,
		ignore: 'custom-elements-es5-adapter.js,webcomponents-*.js'
	})),
	size({title: 'Babel ES6->ES5'}),

	// Minify code and HTML
	gulpIf(['elements/*.js', 'scripts/*.js' ], uglify().on('error', logError)),
	size({title: 'Uglify JavaScript'}),
	gulpIf('*.css', minifyCss()),
	size({title: 'Minimize CSS'}),
	gulpIf('*.html', htmlmin({
		removeAttributeQuotes: false,
		removeEmptyAttributes: false,
		removeRedundantAttributes: false
	})),
	size({title: 'Minimize HTML'}));
