<template>
    <RouterLink
        :to="{ name: 'shop'}"
    >
        <h1 class="text-5xl font-black text-white">
            Aero<span class="text-green-400 ">Vue</span>
        </h1>

    </RouterLink>
</template>

<script setup>
    import {RouterLink} from 'vue-router'
</script>
