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
        <!-- TODO -->

        <h4>Your current config for Terser</h4>
        <Output :key="object" :code="object"></Output>
    </div>
</template>

<script>
    import stringifyObject from 'stringify-object';
    import Output from './output';

    export default {
        name: 'Explainer',
        components: {
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
                return `const config = ${objString};`;
            },
        },
    };
</script>
