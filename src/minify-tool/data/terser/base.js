export default `// Import Terser so we can use it
const Terser = require('terser');

// Import fs so we can read/write files
const fs = require('fs');

// Define the config for how Terser should minify the code
// This is set to how you currently have this web tool configured
const config = {{CONFIG}};

// Load in your code to minify
const code = fs.readFileSync('my_code.js', 'utf8');

// Minify the code with Terser, raising any errors
const minified = Terser.minify(code, config);
if (minified.error) throw minified.error;`;
