<template>
    <div class="explainer">
        <h3>Why minify your JavaScript?</h3>

        <p>
            Minifying, or minification, is where you remove unnecessary characters from your code, whether they might be
            whitespace (such as indentation), code that isn't ever used, comments in your code or long names for
            variables that can be replaced with something shorter.
        </p>

        <p>
            Minification of your code results in it taking up less space, making it faster to send from a server to a
            client, as well as using less bandwidth in doing so. This improves the user experience on your site as it
            can load faster.
        </p>

        <p>
            You should only minify the code that you are distributing though, not your source version that you are
            writing, as minified code is harder to read and understand, making debugging more complicated. Providing a
            source map helps with this, as it maps the minified code back to the original source code, allowing
            production errors to be mapped to the correct bit of code in the source version.
        </p>

        <h3>Using Terser in a production pipeline</h3>

        <p>
            There are many different options available for minifying your code in a production workflow, such as
            uglify-js or minify, but Terser seems to be the most popular tool currently available, as it is able to
            handle both ES5 & ES6 syntax out of the box.
        </p>

        <p>
            Terser is available on NPM, and can be installed in your project with
            <code class="slim">npm install terser</code>. Optionally, you can install it globally on your machine by
            adding the <code class="slim">-g</code> flag to the command, allowing the CLI to be used anywhere and the
            module to be included in any project.
        </p>

        <p>
            Once installed, there are two main ways to interact with Terser. Either, you can use the command line
            interface (CLI) via your terminal/console, or you can use the Terser JavaScript API which allows for more
            fine control over how your code is minified.
        </p>

        <p>
            To minify a file with Terser via the CLI, you can run
            <code class="slim">terser my_code.js --output my_file.min.js</code>. Compression and mangling can be enabled
            with the <code class="slim">--compress</code> and <code class="slim">--mangle</code> flags respectively.
            Sourcemap generation can also be enabled with the <code class="slim">--source-map</code> flag. An example of
            how to minify your code using the Terser JavaScript API is included below.
        </p>

        <p>
            For more information on using the Terser CLI &amp; API, please see <ExternalLink
                link="https://github.com/terser/terser#command-line-usage"
                text="their documentation on GitHub"
            ></ExternalLink>.
        </p>

        <h4>Example usage for Terser with your current config</h4>
        <Output :key="object" :code="object"></Output>
    </div>
</template>

<script>
    import stringifyObject from 'stringify-object';
    import ExternalLink from 'do-vue/src/templates/external_link';
    import normalUsage from '../data/terser/normal_usage';
    import sourcemapUsage from '../data/terser/sourcemap_usage';
    import Output from './output';

    export default {
        name: 'Explainer',
        components: {
            ExternalLink,
            Output,
        },
        props: {
            config: Object,
        },
        computed: {
            object() {
                const objString = stringifyObject(this.$props.config, {
                    indent: '  ',
                    singleQuotes: true,
                });

                if (this.$props.config.sourceMap) {
                    return sourcemapUsage
                        .replace(/{{CONFIG}}/g, objString)
                        .replace(/{{FILE}}/g, this.$props.config.sourceMap.filename);
                }

                return normalUsage.replace(/{{CONFIG}}/g, objString);
            },
        },
    };
</script>
