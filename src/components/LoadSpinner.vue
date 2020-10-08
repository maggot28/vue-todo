<template>
  <div class="md-layout md-gutter" :class="'md-alignment-center-'+align">
    <md-progress-spinner md-mode="indeterminate" :md-diameter="size"></md-progress-spinner>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    props: ['align', 'size'],
  }
</script>

<style lang="less" scoped>
  .md-progress-spinner {
    margin: 24px;
  }
</style>