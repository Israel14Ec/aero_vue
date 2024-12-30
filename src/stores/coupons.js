import {ref, watch, computed} from 'vue'
import {defineStore} from 'pinia'
import { useCartStore } from './cart'


export const useCouponStore = defineStore('coupon', () => {

    const cart = useCartStore()
    const couponInput = ref('')
    const couponValidationMessage = ref('')
    const discountPorcentage = ref(0)
    const discount = ref(0)

    //Cupones validos
    const VALID_COUPONS = [
        {name: 'PRIMER@COMPRA', discount: .5},
        {name: '10DESCUENTO', discount: .10},
        {name: '20DESCUENTO', discount: .20}
    ]

    watch (discountPorcentage, () => {
        discount.value = (cart.total * discountPorcentage.value).toFixed(2)
    })
    

    function applyCoupon (){
        if(VALID_COUPONS.some(coupon => coupon.name === couponInput.value)){
            couponValidationMessage.value = "Aplicando ..."
            
            setTimeout(() => {
                discountPorcentage.value = VALID_COUPONS.find(coupon => coupon.name === couponInput.value).discount //Encuentra el porcentaje del arreglo
                couponValidationMessage.value = "¡Descuento aplicado!"
            }, 3000);
        
        }else{
            couponValidationMessage.value = "No existe ese cupon"
        }

        setTimeout(() => {
            couponValidationMessage.value = ""
        }, 6000);
        
    }
    
    function $reset (){
        couponInput.value = ''
        couponValidationMessage.value = ''
        discountPorcentage.value = 0
        discount.value = 0
    
    }

    //Verifica si el cupon ya fue canjeado
    const isValidCoupon = computed (() => discountPorcentage.value > 0)

    return {
        couponInput,
        discount,
        applyCoupon,
        $reset,
        couponValidationMessage,
        isValidCoupon
    }
})