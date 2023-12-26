<template>
    <div style="width: 100%;height: 100%;">
        <iframe width="100%" height="100%" :src="iframeUrl" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    name: 'Iframe',
    data() {
        return {
            iframeUrl: '',
        }
    },
    watch: {
        $route: {
            handler() {
                this.iframeUrl = this.$route.query.url
            },
            deep: true,
            immediate: true
        },
    }
}
</script>

<style lang="scss" scoped></style>