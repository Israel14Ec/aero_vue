<template>
    <RouterLink

        :to="{name: to}"
        class="round bg-green-400 hover:bg-green-500 font-bold py-2 px-10"
    >
        <slot></slot>
    </RouterLink>
</template>

<script setup>
    import {RouterLink} from 'vue-router'

    //To es un prop para hacer el link dinamico
    defineProps({
        to: {
            type: String
        }
    })
</script>
