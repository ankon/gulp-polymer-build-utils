'use strict';

const combine = require('stream-combiner');

const addCacheBusting = require('./add-cache-busting.js');
const addCspCompliance = require('./add-csp-compliance.js');
const injectCustomElementsEs5Adapter = require('./inject-custom-elements-es5-adapter.js');
const optimizeAssets = require('./optimize-assets.js');
const polymerBuild = require('./polymer-build.js');

/**
 * Best practice build pipeline. This only only chains up the various build steps.
 * 
 * @param {Object} config Content of polymer.json
 * @return
 */
function build(config) {
	return combine(
		polymerBuild(config).on('error', e => console.log(e.message)),
		addCspCompliance,
		addCacheBusting,
		optimizeAssets,
		injectCustomElementsEs5Adapter
	);
}

module.exports = build;

