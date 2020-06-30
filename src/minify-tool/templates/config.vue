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
                            <PrettyCheck v-model="config.mangle" class="p-default p-curve p-fill p-icon">
                                <i slot="extra" class="icon fas fa-check"></i>
                            </PrettyCheck>
                        </div>
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
        },
        props: {
            config: Object,
        },
    }
</script>
