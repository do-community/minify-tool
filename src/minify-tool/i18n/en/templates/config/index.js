import compress from './compress';
import mangle from './mangle';

export default {
    terserDefaultsPreset: 'Use the default options for Terser, which will mangle the code but not remove unused code',
    compressionPreset: 'Enable compression with Terser defaults, mangling and removing any unused code',
    safeCompressionPreset: 'Enable compression, but preserve functions and classes from being mangled or removed',
    module: 'Module',
    moduleDesc: 'Enable if you are minifying an ES6 module',
    filename: 'File name',
    filenameDesc: 'Provide a filename for your output script to enable source map generation',
    comments: 'Comments',
    commentsRemove: 'Remove all comments',
    commentsPreserve: 'Preserve JSDoc @preserve and @license comments',
    commentsKeep: 'Keep all comments',
    compress,
    mangle,
};
