<template>
    
    <h1 class="text-4xl font-black my-10">Resumen de ventas</h1>
    
    <div class="md:flex md:items-start gap-5">
        <div class="md:w-1/2 lg:w-1/3 bg-white flex justify-center p-5">
            <VueTailwindDatepicker
                i18n="es-es"
                :as-single="true"
                no-input
                v-model="sales.date"
                :formatter="formatter"
            />
        </div>
        <div class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-32">
            <p
                class="text-center text-lg"
                v-if="sales.isDateSelected"
            >
                Ventas de la fecha: <span class="font-black">{{ sales.date }}</span>
            </p>

            <p class="text-center text-lg" v-else> Selecciona una fecha</p>
            

            <div v-if="sales.salesCollection.length" class="space-y-5">

                <p class="text-right text-xl">Total del día: 
                    <span class="font-black">
                        {{ formatCurrency(sales.totalSalesofDay)}}
                    </span>
                </p>

                <SaleDetails
                    v-for="sale in sales.salesCollection"
                    :key="sale.id"
                    :sale="sale"
                />
            </div>

            <p v-else-if="sales.noSales" class="text-lg text-center">No hay ventas en este dia</p>
        
        
        </div>

    </div>

</template>

<script setup>

    import {ref} from 'vue'
    import VueTailwindDatepicker from 'vue-tailwind-datepicker'
    import {useSalesStore} from '../../stores/sales'
    import SaleDetails from '../../components/SaleDetails.vue'
    import { formatCurrency } from '../../helpers';

        const sales = useSalesStore()
        const formatter = ref({
            date: 'DD/MM/YYYY',
            month: 'MMMM'
        })
</script>

