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
    <div class="field is-horizontal is-aligned-top">
        <div class="field-label">
            <label class="label">{{ i18n.templates.config.compress.compress }}</label>
        </div>
        <div class="field-body is-vertical">
            <div class="field">
                <div class="control">
                    <div class="checkbox">
                        <PrettyCheck v-model="compressBool" class="p-default p-curve p-fill p-icon">
                            <i slot="extra" class="icon fas fa-check"></i>
                            {{ i18n.templates.config.compress.compressDesc }}
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
                                        {{ i18n.templates.config.compress.deadCodeDesc }}
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
                                        {{ i18n.templates.config.compress.dropConsoleDesc }}
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
                                        {{ i18n.templates.config.compress.dropDebuggerDesc }}
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
                                        {{ i18n.templates.config.compress.keepClassnamesDesc }}
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
                                        {{ i18n.templates.config.compress.keepFargsDesc }}
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
                                        {{ i18n.templates.config.compress.keepFnamesDesc }}
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
                                        {{ i18n.templates.config.compress.keepInfinityDesc }}
                                    </PrettyCheck>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import i18n from '../../i18n';
    import PrettyCheck from 'pretty-checkbox-vue/check';

    export default {
        name: 'CompressConfig',
        components: {
            PrettyCheck,
        },
        props: {
            config: Object,
        },
        data() {
            return {
                i18n,
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
            };
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
        },
        created() {
            this.setCompress();
        },
        methods: {
            setCompress() {
                this.$props.config.compress = this.$data.compressBool === false ? false : this.$data.compressOpts;
            },
        },
    };
</script>
