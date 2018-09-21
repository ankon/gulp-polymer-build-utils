'use strict';

const crisper = require('gulp-crisper');
const filter = require('gulp-filter');
const combine = require('stream-combiner');
const size = require('gulp-size');

const elementsFilter = filter(['elements/elements.html'], { restore: true });

/**
 * Splits the combined Polymer file for CSP compliance
 */
module.exports = combine(
	elementsFilter,
	size({title: 'add-csp-compliance'}),
	crisper({scriptInHead:false}),
	elementsFilter.restore);