import base from './base';

export default `${base}

// Save the code!
fs.writeFileSync('{{FILE}}', minified.code);

// Save the generated sourcemap
fs.writeFileSync('{{FILE}}.map', minified.map);`;
