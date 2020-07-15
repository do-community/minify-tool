<template>
    <div class="explainer">
        <h3>{{ i18n.templates.explainer.whyMinifyYourJavaScript }}</h3>

        <p v-for="paragraph in i18n.templates.explainer.whyMinifyYourJavaScriptContent"
           v-html="inlineCode(paragraph)"
        ></p>

        <h3>{{ i18n.templates.explainer.usingTerserInAProductionPipeline }}</h3>

        <p v-for="paragraph in i18n.templates.explainer.usingTerserInAProductionPipelineContent"
           v-html="inlineCode(paragraph)"
        ></p>

        <p>
            {{ i18n.templates.explainer.forMoreInformationPleaseSee }}
            <ExternalLink
                link="https://github.com/terser/terser#command-line-usage"
                :text="i18n.templates.explainer.theirDocumentationOnGitHub"
            ></ExternalLink>
        </p>

        <h4>{{ i18n.templates.explainer.exampleUsageForTerser }}</h4>
        <Output :key="example" :code="example"></Output>
    </div>
</template>

<script>
    import stringifyObject from 'stringify-object';
    import ExternalLink from 'do-vue/src/templates/external_link';

    import i18n from '../i18n';
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
        data() {
            return {
                i18n,
            };
        },
        computed: {
            example() {
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
        methods: {
            inlineCode(str) {
                return str.replace(/`([^`]+)`/g, '<code class=\'slim\'>$1</code>');
            },
        },
    };
</script>
