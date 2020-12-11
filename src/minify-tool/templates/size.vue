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
    <div class="size">
        <h4>{{ i18n.templates.size.codeSize }}</h4>
        <div class="data">
            <p>
                {{ i18n.templates.size.before }}
                <b>{{ prettyBytes(beforeSize) }}</b>
            </p>
            <p>
                {{ i18n.templates.size.after }}
                <b>{{ prettyBytes(afterSize) }}</b>
            </p>
            <p>
                {{ i18n.templates.size.saving }}
                <b :class="savingClass">
                    {{ (savingPer || 0).toLocaleString(undefined, { maximumFractionDigits: 2 }) }}% ({{ prettyBytes(saving) }})
                </b>
            </p>
        </div>
    </div>
</template>

<script>
    import i18n from '../i18n';
    import getLength from 'utf8-byte-length';
    import prettyBytes from 'pretty-bytes';

    export default {
        name: 'Size',
        props: {
            before: String,
            after: String,
        },
        data() {
            return {
                i18n,
            };
        },
        computed: {
            beforeSize() {
                return getLength(this.$props.before);
            },
            afterSize() {
                return getLength(this.$props.after);
            },
            saving() {
                return this.beforeSize - this.afterSize;
            },
            savingPer() {
                return this.saving / this.beforeSize * 100;
            },
            savingClass() {
                if (this.savingPer <= 0) return 'has-text-danger';
                if (this.savingPer <= 30) return 'has-text-warning';
                return 'has-text-success';
            },
        },
        methods: {
            prettyBytes,
        },
    };
</script>
