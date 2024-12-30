<template>
    
    <p v-if="cart.isEmpty" class="text-3xl font-bold  text-center text-gray-900">El carrito esta vacio</p>
  
    <div v-else>
        <p class="text-3xl font-bold text-center text-gray-900">Resumen de Venta</p>
        <ul
            role="list"
            class="mt-6 divide-y"
        >

            <ShoppingCartItem
                v-for="item in cart.items"
                :key="item.id"
                :item="item"
            />
            
        </ul>

        <dl class="space-y-3 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">    <!--Definicion de lista en HTML-->
            <Amount>
                <template #label>  <!--Uso el slot con el nombre-->
                    Subtotal: 
                </template>
                {{ formatCurrency(cart.subtotal) }} <!--Uso el slot por default-->
            </Amount>

            <Amount>
                <template #label>  
                    IVA (12%): 
                </template>
                {{ formatCurrency(cart.taxes) }}
            </Amount>

            <Amount v-if="coupon.isValidCoupon">
                <template #label>  
                    Descuento
                </template>
                {{ formatCurrency(coupon.discount) }}
            </Amount>

            
            <Amount>
                <template #label>  
                    Total a pagar: 
                </template>
                {{ formatCurrency(cart.total) }}
            </Amount>
        </dl>

        <CouponForm/>

        <button
            type="button"
            class="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3"
            @click="cart.checkout"
        >
            Confirmar Compra
        </button>
    </div>

</template>

<script setup>

    import { useCartStore } from '../stores/cart'
    import { useCouponStore } from '../stores/coupons';
    import ShoppingCartItem from './ShoppingCartItem.vue'
    import CouponForm from './CouponForm.vue';
    import Amount from './Amount.vue';
    import { formatCurrency } from '../helpers';
    
    const cart = useCartStore()
    const coupon = useCouponStore()

</script>

