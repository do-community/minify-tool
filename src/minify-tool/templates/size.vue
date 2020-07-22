<template>
    <div class="size">
        <h4>Code Size</h4>
        <div class="data">
            <p>Before: <b>{{ prettyBytes(beforeSize) }}</b></p>
            <p>After: <b>{{ prettyBytes(afterSize) }}</b></p>
            <p>
                Saving:
                <b :class="savingClass">
                    {{ savingPer.toLocaleString(undefined, { maximumFractionDigits: 2 }) }}% ({{ prettyBytes(saving) }})
                </b>
            </p>
        </div>
    </div>
</template>

<script>
    import getLength from 'utf8-byte-length';
    import prettyBytes from 'pretty-bytes';

    export default {
        name: 'Size',
        props: {
            before: String,
            after: String,
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
