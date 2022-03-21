<!--
Copyright 2022 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<template>
    <div class="all do-bulma">
        <div class="container">
            <Header :title="i18n.templates.app.title">
                <template #description>
                    {{ i18n.templates.app.description }}
                </template>
            </Header>
            <div class="columns">
                <div class="column is-half is-full-touch">
                    <div class="actions">
                        <a class="button is-primary" @click="generate">{{ i18n.templates.app.compress }}</a>
                        <div class="checkbox">
                            <PrettyCheck v-model="liveCompress" class="p-default p-curve p-fill p-icon">
                                <template #extra>
                                    <i class="icon fas fa-check"></i>
                                </template>
                                {{ i18n.templates.app.liveCompression }}
                            </PrettyCheck>
                        </div>
                    </div>

                    <h3>{{ i18n.templates.app.input }}</h3>
                    <div class="editor">
                        <PrismEditor v-model="input" :highlight="highlighter"></PrismEditor>
                    </div>
                </div>

                <div class="column is-half is-full-touch">
                    <div class="tabs">
                        <ul>
                            <li v-if="error" :class="tab === 'errors' ? 'is-active' : ''" @click="tab = 'errors'">
                                <a>{{ i18n.templates.app.errors }}</a>
                            </li>
                            <li v-if="warn" :class="tab === 'warnings' ? 'is-active' : ''" @click="tab = 'warnings'">
                                <a>{{ i18n.templates.app.warnings }}</a>
                            </li>
                            <li :class="tab === 'output' ? 'is-active' : ''" @click="tab = 'output'">
                                <a>{{ i18n.templates.app.output }}</a>
                            </li>
                            <li v-if="map" :class="tab === 'map' ? 'is-active' : ''" @click="tab = 'map'">
                                <a>{{ i18n.templates.app.map }}</a>
                            </li>
                        </ul>
                    </div>

                    <article v-if="tab === 'errors'" class="message is-danger">
                        <div class="message-header">
                            <p>{{ i18n.templates.app.errorMsg }}</p>
                        </div>
                        <div class="message-body">
                            {{ error }}
                        </div>
                    </article>

                    <article v-if="tab === 'warnings'" class="message is-warning">
                        <div class="message-header">
                            <p>
                                {{ warn.length === 1 ? i18n.templates.app.warningMsg : i18n.templates.app.warningsMsg }}
                            </p>
                        </div>
                        <div class="message-body">
                            <ul v-for="warning in warn">
                                <li>{{ warning }}</li>
                            </ul>
                        </div>
                    </article>

                    <template v-if="tab === 'output'">
                        <h3>{{ i18n.templates.app.output }}</h3>
                        <Output :key="output" :code="output"></Output>
                        <Size :before="input" :after="output"></Size>
                    </template>

                    <template v-if="tab === 'map'">
                        <h3>{{ i18n.templates.app.mapTitle }}</h3>
                        <SourceMap :key="map" :code="map"></SourceMap>
                    </template>
                </div>
            </div>

            <Config :config="config"></Config>
            <Explainer :config="config"></Explainer>
        </div>

        <Footer :text="i18n.templates.app.oss"></Footer>
    </div>
</template>

<script>
    // All the Prism highlighting for the input
    import { PrismEditor } from 'vue-prism-editor';
    import { highlight, languages } from 'prismjs/components/prism-core';
    import 'prismjs/components/prism-clike';
    import 'prismjs/components/prism-javascript';

    // Other packages we need
    import Header from 'do-vue/src/templates/header';
    import Footer from 'do-vue/src/templates/footer';
    import PrettyCheck from 'do-vue/src/templates/pretty-checkbox-vue/pretty_check';
    import clone from 'clone';

    // Terser! The core of this tool
    import { minify } from 'terser';

    // Local components we need
    import Output from './output';
    import Size from './size';
    import SourceMap from './sourcemap';
    import Config from './config';
    import Explainer from './explainer';

    // Local data that we need
    import i18n from '../i18n';
    import exampleCode from '../data/example_code';

    export default {
        name: 'App',
        components: {
            Header,
            PrettyCheck,
            PrismEditor,
            Output,
            Size,
            SourceMap,
            Config,
            Explainer,
            Footer,
        },
        data() {
            return {
                i18n,
                liveCompress: true,
                input: exampleCode,
                tab: 'output',
                error: '',
                warn: '',
                output: '',
                map: '',
                config: Config.delegated,
            };
        },
        watch: {
            input() {
                if (this.$data.liveCompress) this.generate();
            },
            config: {
                handler() {
                    this.generate();
                },
                deep: true,
            },
            error(data) {
                // If no error, and we're on this tab, we need to not be on this tab
                if (!data && this.$data.tab === 'errors') {
                    this.$data.tab = 'output';
                    return;
                }

                // If we have a new error, jump to it to be annoying
                if (data) {
                    this.$data.tab = 'errors';
                }
            },
            warn(data) {
                // If no warnings, and we're on this tab, we need to not be on this tab
                if (!data && this.$data.tab === 'warnings') {
                    this.$data.tab = 'output';
                }

                // We don't jump to this tab if there are warnings, they aren't as important
            },
            map(data) {
                // If no source map generated, and we're on this tab, we need to not be on this tab
                if (!data && this.$data.tab === 'map') {
                    this.$data.tab = 'output';
                }
            },
        },
        methods: {
            async generate() {
                try {
                    const result = await minify(this.$data.input, {
                        ...clone(this.$data.config), // Use clone to avoid terser populating child objects
                        warnings: 'verbose',
                    });
                    this.$data.error = null;
                    this.$data.warn = result.warnings;
                    this.$data.output = result.code;
                    this.$data.map = result.map;
                } catch (error) {
                    this.$data.error = `Line ${error.line.toLocaleString()}: ${error.message}`;
                    this.$data.warn = null;
                    this.$data.output = '// Failed to generate';
                    this.$data.map = null;
                }
            },
            highlighter(code) {
                return highlight(code, languages.js);
            },
        },
    };
</script>
