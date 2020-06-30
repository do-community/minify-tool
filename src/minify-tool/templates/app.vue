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
            <div class="columns">
                <div class="column is-half is-full-touch">
                    <textarea v-model.lazy="input"></textarea>
                </div>
                <div class="column is-half is-full-touch">
                    <article v-if="error" class="message is-danger">
                        <div class="message-header">
                            <p>{{ i18n.templates.app.error }}</p>
                        </div>
                        <div class="message-body">
                            {{ error }}
                        </div>
                    </article>
                    <article v-if="warn" class="message is-warning">
                        <div class="message-header">
                            <p>{{ warn.length === 1 ? i18n.templates.app.warning : i18n.templates.app.warnings }}</p>
                        </div>
                        <div class="message-body">
                            <ul v-for="warning in warn">
                                <li>{{ warning }}</li>
                            </ul>
                        </div>
                    </article>
                    <textarea readonly v-text="output"></textarea>
                    <textarea v-if="map" readonly v-text="map"></textarea>
                </div>
            </div>

            <Config :config="config"></Config>
        </div>

        <Footer :text="i18n.templates.app.oss"></Footer>
    </div>
</template>

<script>
    import i18n from '../i18n';
    import Footer from 'do-vue/src/templates/footer';
    import terser from 'terser';
    import Config from './config';

    export default {
        name: 'App',
        components: {
            Config,
            Footer,
        },
        data() {
            return {
                i18n,
                input: '',
                error: '',
                warn: '',
                output: '',
                map: '',
                config: Config.delegated,
            };
        },
        watch: {
            input() {
                this.generate();
            },
            config: {
                handler() {
                    this.generate();
                },
                deep: true,
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
