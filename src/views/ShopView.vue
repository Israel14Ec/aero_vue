
<script setup>

    import {storeToRefs} from 'pinia' //ayuda a no romper la reactividad al hacer destructuring
    import MainNav from '../components/MainNav.vue';
    import ProductCard from '../components/ProductCard.vue';
    import ShoppingCart from '../components/ShoppingCart.vue';
    import {useProductStore} from '../stores/products'

    const products = useProductStore()
    const { filterProducts, noResults} = storeToRefs(products) //Destructuring, extaer funciones

</script>

<template>
    <MainNav/>

    <main class="pt-10 lg:flex lg:h-screen lg:overflow-hidden">
        
        <div class="lg:w-2/3 lg:screen lg:overflow-y-scroll py-24 px-10">

            <p class="text-center text-4xl" v-if="noResults"> No hay productos</p>

            <div 
                v-else
                class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5"
            >   
                <ProductCard
                    v-for="product in filterProducts"
                    :key="product.id"
                    :product="product"
                />

            </div>
        </div>


        <aside class="lg:w-1/3 lg:screen lg:overflow-y-scroll py-32 px-10">
            <ShoppingCart
            
            />
        </aside>

    </main>
    
</template>

