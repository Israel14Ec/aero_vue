<template>

    <div>
        <p class="mt-5 py-5 font-bold border-t border-gray-200">¿Tienes un cupon?</p>

    <div class="flex">
        <input type="text"
            placeholder="Ingresa un cupón"
            class="p-2 bg-white border-gray-300 w-[80%]"
            v-model="store.couponInput"
        >

        <button
            type="button"
            class="p3 bg-green-400 font-bold disabled:opacity-30"
            @click="store.applyCoupon"
            :disabled="store.isValidCoupon"
        >
        Canjear
        </button>
    </div>

    <p class="py-2 text-center text-sm font-extrabold text-red-500">
        {{ store.couponValidationMessage }}
    </p>
    </div>
   

</template>

<script setup>
    import { useCouponStore } from '../stores/coupons';
    const store = useCouponStore()

</script>

