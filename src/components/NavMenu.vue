<template>
    <div id="nav-menu">
        <auth></auth>
    </div>
</template>
<script>
import Auth from './Auth.vue'

export default {
    name: "nav-menu",
    components: {
        Auth,
    },
}
</script>