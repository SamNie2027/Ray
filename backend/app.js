try {
	// Prefer CommonJS test entry that avoids ESM import syntax
	module.exports = require('./src/server.cjs');
} catch (e) {
	// Fallback to ESM server if needed
	module.exports = require('./src/server.js').default || require('./src/server');
}
