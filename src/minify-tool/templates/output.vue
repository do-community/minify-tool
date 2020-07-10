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
    <div><pre><code class="language-js">{{ code }}</code></pre></div>
</template>

<script>
    import Prism from 'prismjs';
    import 'prismjs/plugins/toolbar/prism-toolbar';
    import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';

    export default {
        name: 'Output',
        props: {
            code: String,
        },
        mounted() {
            Prism.highlightAllUnder(this.$el);
        },
    };
</script>
