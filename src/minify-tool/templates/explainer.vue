<template>
    <div class="explainer">
        <h3>Why minify your JavaScript?</h3>
        <!-- TODO -->

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
