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

export default {
    compress: 'Compress',
    compressDesc: 'Compress the output script',
    deadCodeDesc: 'Remove unreachable code from the script',
    dropConsoleDesc: 'Remove calls to console.* from the script',
    dropDebuggerDesc: 'Remove calls to debugger from the script',
    keepClassnamesDesc: 'Preserve unused classes in the script',
    keepFargsDesc: 'Preserve unused arguments within functions',
    keepFnamesDesc: 'Preserve unused functions in the script',
    keepInfinityDesc: 'Preserve `Infinity` usage, instead of replacing it with `1/0`',
};
