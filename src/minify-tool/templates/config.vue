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
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <div class="checkbox">
                            <PrettyCheck v-model="config.compress" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                                Compress the output script
                            </PrettyCheck>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal is-aligned-top">
            <div class="field-label">
                <label class="label">Mangle</label>
            </div>
            <div class="field-body">
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
            </div>
        </div>

        <!-- TODO: visual indent to put these underneath mangle -->
        <template v-if="mangleBool">
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
        </template>

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
                        />
                        <br/>
                        <small>Provide a file name for your script to enable source map generation</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PrettyCheck from 'pretty-checkbox-vue/check';

    export default {
        name: 'Config',
        components: {
            PrettyCheck,
        },
        delegated: {
            compress: false,
            mangle: true,
            module: false,
            sourceMap: false,
        },
        props: {
            config: Object,
        },
        data() {
            return {
                mangleBool: true,
                mangleOpts: {
                    eval: false,
                    keep_classnames: false,
                    keep_fnames: false,
                    // module: false, // This seems to be dupe of the top-level `module` opt?
                    // TODO: reserved: [],
                    toplevel: false,
                    safari10: false,
                },
                filename: '',
            };
        },
        methods: {
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
    };
</script>
