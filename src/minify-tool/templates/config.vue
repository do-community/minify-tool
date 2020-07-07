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
    <div>
        <a class="button is-primary" @click="preset('terser')">Terser Defaults</a>
        <a class="button is-primary" @click="preset('compress')">Compression</a>
        <a class="button is-primary" @click="preset('safe-compress')">Safe Compression</a>

        <CompressConfig :config="config"></CompressConfig>
        <MangleConfig :config="config"></MangleConfig>

        <div class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">{{ i18n.templates.config.module }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <div class="checkbox">
                            <PrettyCheck v-model="config.module" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                {{ i18n.templates.config.moduleDesc }}
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ i18n.templates.config.filename }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <input v-model.lazy.trim="filename"
                               class="input"
                               type="text"
                               placeholder="dist.min.js"
                        />
                        <br />
                        <small>{{ i18n.templates.config.filenameDesc }}</small>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">{{ i18n.templates.config.comments }}</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <VueSelect v-model="config.output.comments"
                                   :options="commentsOptions"
                                   :clearable="false"
                                   :reduce="s => s.value"
                        ></VueSelect>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import i18n from '../i18n';
    import PrettyCheck from 'pretty-checkbox-vue/check';
    import VueSelect from 'vue-select';
    import CompressConfig from './config/compress';
    import MangleConfig from './config/mangle';

    export default {
        name: 'Config',
        components: {
            PrettyCheck,
            VueSelect,
            CompressConfig,
            MangleConfig,
        },
        delegated: {
            compress: false,
            mangle: true,
            module: false,
            sourceMap: false,
            output: {
                comments: 'some',
            },
        },
        props: {
            config: Object,
        },
        data() {
            return {
                i18n,
                filename: '',
                commentsOptions: [
                    { label: i18n.templates.config.commentsRemove, value: false },
                    { label: i18n.templates.config.commentsPreserve, value: 'some' },
                    { label: i18n.templates.config.commentsKeep, value: true },
                ],
            };
        },
        watch: {
            filename() {
                this.setSourceMap();
            },
        },
        created() {
            this.setSourceMap();
        },
        methods: {
            setSourceMap() {
                this.$props.config.sourceMap = this.$data.filename.length ? {
                    filename: this.$data.filename,
                    url: `${this.$data.filename}.map`,
                } : false;
            },
            preset(opt) {
                // Both of these use default settings for mangle
                if (opt === 'terser' || opt === 'compress') {
                    // Mirrors defaults from templates/config/mangle.vue
                    this.$props.config.mangle = {
                        eval: false,
                        keep_classnames: false,
                        keep_fnames: false,
                        toplevel: false,
                        safari10: false,
                    };

                    this.$props.config.output = {
                        comments: 'some',
                    };
                }

                // Apply preset specifics
                switch (opt) {
                case 'terser': {
                    this.$props.config.compress = false;
                    break;
                }

                case 'compress': {
                    // Mirrors defaults from templates/config/compress.vue
                    this.$props.config.compress = {
                        dead_code: true,
                        drop_console: false,
                        drop_debugger: true,
                        keep_classnames: false,
                        keep_fargs: true,
                        keep_fnames: false,
                        keep_infinity: false,
                    };
                    break;
                }

                case 'safe-compress': {
                    this.$props.config.compress = {
                        dead_code: true,
                        drop_console: false,
                        drop_debugger: false, // Do we want to drop debugger still?
                        keep_classnames: true,
                        keep_fargs: true,
                        keep_fnames: true,
                        keep_infinity: true,
                    };

                    this.$props.config.mangle = {
                        eval: false,
                        keep_classnames: true,
                        keep_fnames: true,
                        toplevel: false,
                        safari10: false,
                    };

                    this.$props.config.output = {
                        comments: true,
                    };
                    break;
                }
                }
            },
        },
    };
</script>
