'use strict';

const filter = require('gulp-filter');
const combine = require('stream-combiner');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const size = require('gulp-size');

const elementsFilter = filter(['elements/*'], { restore: true });
const indexFilter = filter(['index.html', 'elements/*'], { restore: true });

/**
 * The elements.js file is imported from elements.html in the same directly.
 * The path prefix must therefore be removed.
 */
function removePathFromJSfile(filename) {
	if (filename.endsWith('js')) {
		return filename.replace('elements/', '');
	}

	return filename;
}

/**
 * Adds cache busting to the element/elements.html file
 */
module.exports = combine(
	elementsFilter,
	rev(),
	size({title: 'add-cache-busting'}),
	elementsFilter.restore,
	indexFilter,
	revReplace({
		modifyUnreved: removePathFromJSfile,
		modifyReved: removePathFromJSfile,
	}),
	size({title: 'add-cache-busting (replace)'}),
	indexFilter.restore);
