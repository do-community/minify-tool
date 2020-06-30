import compress from './compress';
import mangle from './mangle';

export default {
    module: 'Module',
    moduleDesc: 'Enable if you are minifying an ES6 module',
    filename: 'File name',
    filenameDesc: 'Provide a file name for your script to enable source map generation',
    comments: 'Comments',
    commentsRemove: 'Remove all comments',
    commentsPreserve: 'Preserve JSDoc @preserve and @license comments',
    commentsKeep: 'Keep all comments',
    compress,
    mangle,
};
