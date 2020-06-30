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
        <CompressConfig :config="config"></CompressConfig>
        <MangleConfig :config="config"></MangleConfig>

        <div class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">Module</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <div class="checkbox">
                            <PrettyCheck v-model="config.module" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                Enable if you are minifying an ES6 module
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">File name</label>
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
                        <small>Provide a file name for your script to enable source map generation</small>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Comments</label>
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
                filename: '',
                commentsOptions: [
                    { label: 'Remove all comments', value: false },
                    { label: 'Preserve JSDoc @preserve and @license comments', value: 'some' },
                    { label: 'Keep all comments', value: true },
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
        },
    };
</script>
