<template>
    <AdminNav
    />

    <div class="custom-container pt-32 container mx-auto lg:min-h-screen">
        <RouterView/>
    </div>
</template>

<script setup>
    import AdminNav from '../../components/AdminNav.vue';
</script>

<style scoped>

    @media(min-width: 1200px) {
        .custom-container {
            max-width: 1200px;
        }
    }
    
</style>

