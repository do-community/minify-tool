<!--
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
-->

<template>
    <div class="all do-bulma">
        <div class="container">
            <Header :title="i18n.templates.app.title">
                <template v-slot:description>
                    {{ i18n.templates.app.description }}
                </template>
                <template v-slot:input>
                    <PrettyCheck v-model="liveCompress" class="p-default p-curve p-fill p-icon">
                        <i slot="extra" class="icon fas fa-check"></i>
                        {{ i18n.templates.app.liveCompression }}
                    </PrettyCheck>
                </template>
                <template v-slot:buttons>
                    <a class="button is-primary" @click="generate">{{ i18n.templates.app.compress }}</a>
                </template>
            </Header>

            <div class="columns">
                <div class="column is-half is-full-touch">
                    <h3>{{ i18n.templates.app.input }}</h3>
                    <textarea v-model="input" class="code"></textarea>
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
                        <textarea readonly class="code" v-text="output"></textarea>
                    </template>

                    <template v-if="tab === 'map'">
                        <h3>{{ i18n.templates.app.mapTitle }}</h3>
                        <textarea readonly class="code" v-text="map"></textarea>
                    </template>
                </div>
            </div>

            <Config :config="config"></Config>
        </div>

        <Footer :text="i18n.templates.app.oss"></Footer>
    </div>
</template>

<script>
    import i18n from '../i18n';
    import Header from 'do-vue/src/templates/header';
    import Footer from 'do-vue/src/templates/footer';
    import PrettyCheck from 'pretty-checkbox-vue/check';
    import terser from 'terser';
    import Config from './config';

    export default {
        name: 'App',
        components: {
            Header,
            PrettyCheck,
            Config,
            Footer,
        },
        data() {
            return {
                i18n,
                liveCompress: true,
                input: 'const test = (paramOne, paramTwo) => console.log(paramOne, paramTwo);',
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
            generate() {
                const options = {
                    ...this.$data.config,
                    warnings: 'verbose',
                };
                console.log(options);
                const result = terser.minify(this.$data.input, options);
                this.$data.error = result.error;
                this.$data.warn = result.warnings;
                this.$data.output = result.code;
                this.$data.map = result.map;
            },
        },
    };
</script>
