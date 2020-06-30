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
        <div class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">Compress</label>
            </div>
            <div class="field-body is-vertical">
                <div class="field">
                    <div class="control">
                        <div class="checkbox">
                            <PrettyCheck v-model="compressBool" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                Compress the output script
                            </PrettyCheck>
                        </div>
                    </div>
                </div>

                <div v-if="compressBool" class="field">
                    <div class="field is-horizontal is-aligned-top">
                        <div class="field-label">
                            <label class="label">dead_code</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="checkbox">
                                        <PrettyCheck v-model="compressOpts.dead_code" class="p-default p-curve p-fill p-icon">
                                            <i slot="extra" class="icon fas fa-check"></i>
                                            Remove unreachable code from the script
                                        </PrettyCheck>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal is-aligned-top">
                        <div class="field-label">
                            <label class="label">drop_console</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="checkbox">
                                        <PrettyCheck v-model="compressOpts.drop_console" class="p-default p-curve p-fill p-icon">
                                            <i slot="extra" class="icon fas fa-check"></i>
                                            Remove calls to console.* from the script
                                        </PrettyCheck>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal is-aligned-top">
                        <div class="field-label">
                            <label class="label">drop_debugger</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="checkbox">
                                        <PrettyCheck v-model="compressOpts.drop_debugger" class="p-default p-curve p-fill p-icon">
                                            <i slot="extra" class="icon fas fa-check"></i>
                                            Remove calls to debugger from the script
                                        </PrettyCheck>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal is-aligned-top">
                        <div class="field-label">
                            <label class="label">keep_classnames</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="checkbox">
                                        <PrettyCheck v-model="compressOpts.keep_classnames" class="p-default p-curve p-fill p-icon">
                                            <i slot="extra" class="icon fas fa-check"></i>
                                            Preserve unused classes in the script
                                        </PrettyCheck>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal is-aligned-top">
                        <div class="field-label">
                            <label class="label">keep_fargs</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="checkbox">
                                        <PrettyCheck v-model="compressOpts.keep_fargs" class="p-default p-curve p-fill p-icon">
                                            <i slot="extra" class="icon fas fa-check"></i>
                                            Preserve unused arguments within functions
                                        </PrettyCheck>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal is-aligned-top">
                        <div class="field-label">
                            <label class="label">keep_fnames</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="checkbox">
                                        <PrettyCheck v-model="compressOpts.keep_fnames" class="p-default p-curve p-fill p-icon">
                                            <i slot="extra" class="icon fas fa-check"></i>
                                            Preserve unused functions in the script
                                        </PrettyCheck>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal is-aligned-top">
                        <div class="field-label">
                            <label class="label">keep_infinity</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="checkbox">
                                        <PrettyCheck v-model="compressOpts.keep_infinity" class="p-default p-curve p-fill p-icon">
                                            <i slot="extra" class="icon fas fa-check"></i>
                                            Preserve `Infinity` usage, instead of replacing it with `1/0`
                                        </PrettyCheck>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">Mangle</label>
            </div>
            <div class="field-body is-vertical">
                <div class="field">
                    <div class="control">
                        <div class="checkbox">
                            <PrettyCheck v-model="mangleBool" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                Mangle variable names within the script
                            </PrettyCheck>
                        </div>
                    </div>
                </div>

                <div v-if="mangleBool" class="field">
                    <div class="field is-horizontal is-aligned-top">
                        <div class="field-label">
                            <label class="label">eval</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="checkbox">
                                        <PrettyCheck v-model="mangleOpts.eval" class="p-default p-curve p-fill p-icon">
                                            <i slot="extra" class="icon fas fa-check"></i>
                                            Mangle variable names within `eval` scopes
                                        </PrettyCheck>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal is-aligned-top">
                        <div class="field-label">
                            <label class="label">keep_classnames</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="checkbox">
                                        <PrettyCheck v-model="mangleOpts.keep_classnames" class="p-default p-curve p-fill p-icon">
                                            <i slot="extra" class="icon fas fa-check"></i>
                                            Enable to preserve class names and not mangle them
                                        </PrettyCheck>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal is-aligned-top">
                        <div class="field-label">
                            <label class="label">keep_fnames</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="checkbox">
                                        <PrettyCheck v-model="mangleOpts.keep_fnames" class="p-default p-curve p-fill p-icon">
                                            <i slot="extra" class="icon fas fa-check"></i>
                                            Enable to preserve function names and not mangle them
                                        </PrettyCheck>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal is-aligned-top">
                        <div class="field-label">
                            <label class="label">toplevel</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="checkbox">
                                        <PrettyCheck v-model="mangleOpts.toplevel" class="p-default p-curve p-fill p-icon">
                                            <i slot="extra" class="icon fas fa-check"></i>
                                            Enable to mangle names within the top-level scope
                                        </PrettyCheck>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal is-aligned-top">
                        <div class="field-label">
                            <label class="label">safari10</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <div class="checkbox">
                                        <PrettyCheck v-model="mangleOpts.safari10" class="p-default p-curve p-fill p-icon">
                                            <i slot="extra" class="icon fas fa-check"></i>
                                            Enable to work around a Safari 10 iterator bug
                                            <!-- TODO: external link to terser docs -->
                                        </PrettyCheck>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

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
                        <br/>
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

    export default {
        name: 'Config',
        components: {
            PrettyCheck,
            VueSelect,
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
                compressBool: false,
                compressOpts: {
                    dead_code: true,
                    drop_console: false,
                    drop_debugger: true,
                    keep_classnames: false,
                    keep_fargs: true,
                    keep_fnames: false,
                    keep_infinity: false,
                },

                mangleBool: true,
                mangleOpts: {
                    eval: false,
                    keep_classnames: false,
                    keep_fnames: false,
                    toplevel: false,
                    safari10: false,
                },

                filename: '',

                commentsOptions: [
                    { label: 'Remove all comments', value: false },
                    { label: 'Preserve JSDoc @preserve and @license comments', value: 'some' },
                    { label: 'Keep all comments', value: true },
                ],
            };
        },
        methods: {
            setCompress() {
                this.$props.config.compress = this.$data.compressBool === false ? false : this.$data.compressOpts;
            },
            setMangle() {
                this.$props.config.mangle = this.$data.mangleBool === false ? false : this.$data.mangleOpts;
            },
            setSourceMap() {
                this.$props.config.sourceMap = this.$data.filename.length ? {
                    filename: this.$data.filename,
                    url: `${this.$data.filename}.map`,
                } : false;
            }
        },
        watch: {
            compressBool() {
                this.setCompress();
            },
            compressOpts: {
                handler() {
                    this.setCompress();
                },
                deep: true,
            },
            mangleBool() {
                this.setMangle();
            },
            mangleOpts: {
                handler() {
                    this.setMangle();
                },
                deep: true,
            },
            filename() {
                this.setSourceMap();
            },
        },
        created() {
            this.setCompress();
            this.setMangle();
            this.setSourceMap();
        },
    };
</script>
