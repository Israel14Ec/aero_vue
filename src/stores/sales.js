import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import { query, collection, where} from 'firebase/firestore'
import {useFirestore, useCollection} from 'vuefire'

export const useSalesStore = defineStore ('sale', () => {

    const date = ref('')
    const db = useFirestore()

    //Obtiene el campo que buscamos de acuerdo a la fecha
    const salesSource = computed(() => {

        if(date.value){
            const q = query (
                collection(db, 'sales'),
                where('date', '==', date.value)
            )

            return q
        }
    })

    //Se guarda el resultado de la consulta
    const salesCollection = useCollection(salesSource)

    //determina si hay ventas para mostrar el texto
    const noSales = computed(() => !salesCollection.length && date.value )

    //Comprueba si se selecciono la fecha
    const isDateSelected = computed(() => date.value)
    
    //Calcula el total de ganancias en venta

    const totalSalesofDay = computed(() => {

        //comprobamos si salesCollection tiene datos
        return salesCollection.value ? salesCollection.value.reduce((total, sale) => total + sale.total, 0) : 0
    })

    return {
        date,
        isDateSelected,
        salesCollection,
        noSales,
        totalSalesofDay
    }
})