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
    whyMinifyYourJavaScript: 'Why minify your JavaScript?',
    whyMinifyYourJavaScriptContent: [
        'Minifying, or minification, is where you remove unnecessary characters from your code, whether they might be whitespace (such as indentation), code that isn\'t ever used, comments in your code or long names for variables that can be replaced with something shorter.',
        'Minification of your code results in it taking up less space, making it faster to send from a server to a client, as well as using less bandwidth in doing so. This improves the user experience on your site as it can load faster.',
        'You should only minify the code that you are distributing though, not your source version that you are writing, as minified code is harder to read and understand, making debugging more complicated. Providing a source map helps with this, as it maps the minified code back to the original source code, allowing production errors to be mapped to the correct bit of code in the source version.',
    ],
    usingTerserInAProductionPipeline: 'Using Terser in a production pipeline',
    usingTerserInAProductionPipelineContent: [
        'There are many different options available for minifying your code in a production workflow, such as uglify-js or minify, but Terser seems to be the most popular tool currently available, as it is able to handle both ES5 & ES6 syntax out of the box.',
        'Terser is available on NPM, and can be installed in your project with `npm install terser`. Optionally, you can install it globally on your machine by adding the `-g` flag to the command, allowing the CLI to be used anywhere and the module to be included in any project.',
        'Once installed, there are two main ways to interact with Terser. Either, you can use the command line interface (CLI) via your terminal/console, or you can use the Terser JavaScript API which allows for more fine control over how your code is minified.',
        'To minify a file with Terser via the CLI, you can run `terser my_code.js --output my_file.min.js`. Compression and mangling can be enabled with the `--compress` and `--mangle` flags respectively. Sourcemap generation can also be enabled with the `--source-map` flag. An example of how to minify your code using the Terser JavaScript API is included below.',
    ],
    forMoreInformationPleaseSee: 'For more information on using the Terser CLI & API, please see',
    theirDocumentationOnGitHub: 'their documentation on GitHub.',
    exampleUsageForTerser: 'Example usage for Terser with your current config',
};
