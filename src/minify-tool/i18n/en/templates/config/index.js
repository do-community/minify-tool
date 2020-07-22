/*
Copyright 2020 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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
