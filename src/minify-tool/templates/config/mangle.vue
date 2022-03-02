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
    <div class="field is-horizontal is-aligned-top">
        <div class="field-label">
            <label class="label">{{ i18n.templates.config.mangle.mangle }}</label>
        </div>
        <div class="field-body is-vertical">
            <div class="field">
                <div class="control">
                    <div class="checkbox">
                        <PrettyCheck v-model="mangleBool" class="p-default p-curve p-fill p-icon">
                            <template #extra>
                                <i class="icon fas fa-check"></i>
                            </template>
                            {{ i18n.templates.config.mangle.mangleDesc }}
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
                                        <template #extra>
                                            <i class="icon fas fa-check"></i>
                                        </template>
                                        {{ i18n.templates.config.mangle.evalDesc }}
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
                                        <template #extra>
                                            <i class="icon fas fa-check"></i>
                                        </template>
                                        {{ i18n.templates.config.mangle.classnamesDesc }}
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
                                        <template #extra>
                                            <i class="icon fas fa-check"></i>
                                        </template>
                                        {{ i18n.templates.config.mangle.fnamesDesc }}
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
                                        <template #extra>
                                            <i class="icon fas fa-check"></i>
                                        </template>
                                        {{ i18n.templates.config.mangle.toplevelDesc }}
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
                                        <template #extra>
                                            <i class="icon fas fa-check"></i>
                                        </template>
                                        {{ i18n.templates.config.mangle.safari10Desc }}
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
</template>

<script>
    import i18n from '../../i18n';
    import PrettyCheck from 'do-vue/src/templates/pretty-checkbox-vue/pretty_check';

    export default {
        name: 'MangleConfig',
        components: {
            PrettyCheck,
        },
        props: {
            config: Object,
        },
        data() {
            return {
                i18n,
                mangleBool: true,
                mangleOpts: {
                    eval: false,
                    keep_classnames: false,
                    keep_fnames: false,
                    toplevel: false,
                    safari10: false,
                },
            };
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
            config: {
                handler(data) {
                    if (data.mangle === false) {
                        this.$data.mangleBool = false;
                        return;
                    }

                    this.$data.mangleBool = true;
                    this.$data.mangleOpts = data.mangle;
                },
                deep: true,
            },
        },
        created() {
            this.setMangle();
        },
        methods: {
            setMangle() {
                this.$props.config.mangle = this.$data.mangleBool === false ? false : this.$data.mangleOpts;
            },
        },
    };
</script>
