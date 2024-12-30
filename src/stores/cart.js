import {ref, computed, watchEffect} from 'vue'
import {defineStore} from 'pinia'
import {collection, addDoc, runTransaction, doc} from 'firebase/firestore'
import {useFirestore} from 'vuefire'
import {useCouponStore } from './coupons'
import { getCurrentDate} from '../helpers'

export const useCartStore = defineStore('cart', ()=> {

    const coupon = useCouponStore()
    const db = useFirestore()

    const items = ref([])
    const subtotal = ref(0)
    const taxes = ref(0) //impuestos
    const total = ref(0)

    const MAX_PRODUCTS = 5
    const TAX_RATE = .12

    //Estamos observando items, para calcular el subtotal
    watchEffect( () => {
        subtotal.value = items.value.reduce((total, item) => total + (item.quantity * item.price), 0 )
        taxes.value = Number((subtotal.value * TAX_RATE).toFixed(2))
        total.value = Number(((subtotal.value + taxes.value) - coupon.discount).toFixed(2)) //agrega el descuento 
    })

    //añadir elementos
    function addItem(item){

        const index = isItemInCart(item.id)
        
        if (index >= 0) {
            
            if (isProductAvailable(item, index)) { //Controlamos que no ingrese mas al carrito
                alert("Has alzancado el limite")
                return
            } 

            //Actualizamos la cantidad 
            items.value[index].quantity++
            
        } else {
            //Agregamos al carrito
            items.value.push({...item, quantity: 1, id: item.id}) //añado el id, id: item.id, el objeto ya lo tiene pero al guardarle desaparece
        }
        
    }

    //Actualizar la cantidad del carrito para los productos
    function updateQuantity(id, quantity){
        items.value = items.value.map( item => item.id === id ? {...item, quantity} : item)
    }

    //Funcion para eliminar del carrito
    function removeItem(id){
        
        items.value = items.value.filter(item => item.id !== id)
    }

    //Funcion para guardar la compra en firestore
    async function checkout (){
        try {
            await addDoc(collection(db, 'sales'), {
   
                items: items.value.map(item => {
                    const {availability, category, ...data } = item
                    return data
                }), //nos devuelve un nuevo arreglo
                subtotal: subtotal.value,
                taxes: taxes.value,
                discount: coupon.discount,
                total: total.value,
                date: getCurrentDate()
            })

            //Sustraemos la cantidad de lo disponible
            items.value.forEach( async (item) => {
                const producRef = doc(db, 'products', item.id) //esta la refrencia
                await runTransaction(db, async (transaction) => { 
                    const currenProduct = await transaction.get(producRef) //obtenemos el producto
                    const availability = currenProduct.data().availability - item.quantity //modificamos la disponibilidad
                    transaction.update(producRef, {availability}) //Se actualiza,la llave y valor son iguales (availability: availability)
                })
            })

            //Reiniciar el state
            $reset()
            coupon.$reset()
            
        }
        catch {

        }
    }

    function $reset () {
        items.value = []
        subtotal.value = 0
        taxes.value = 0 
        total.value = 0
    }

    //Devuelve la posición si se agrega un elemento repetivo al carrito
    const isItemInCart = id => items.value.findIndex(item => item.id === id)

    //Funcion para la disponibilidad del producto al dar clic en el icono para agregar a carrito
    const isProductAvailable =  (item, index) => {
        return items.value[index].quantity >= item.availability || items.value[index].quantity >= MAX_PRODUCTS
    }


     // Computed para determinar si el carrito esta vacio
    const isEmpty = computed(() => items.value.length === 0)


    //Calcula la disponibilidad del producto
    const checkProductAvailability = computed(() => {

        //Un computed es estatico en el return se le puede pasar un valor
        return (product) => product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS
        
    })

    return {
        items,
        subtotal,
        taxes,
        total,
        addItem,
        removeItem,
        checkout,
        updateQuantity,
        isEmpty,
        checkProductAvailability
    }

   
})