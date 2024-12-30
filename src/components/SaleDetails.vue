<template>

    <div class="border-t border-gray-200 space-y-6 py-6">
        <h2 class="text-2xl font-black">Detalles venta</h2>
        <p class="text-xl font-black">Productos Vendidos</p>

        <ul 
            role="list"
            class="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"    
        >
        <!--Items es un arreglo guardado en firestore -->
            <li
                v-for="item in sale.items"
                class="flex space-x-6 py-6"
            >
                <img
                    :src="item.image"
                    :alt="'Imagen de ' + item.name"
                    class="w-28 h-28 flex-none rounded-lg"
                >

                <div class="flex-auto space-y-2">
                    <h3 class="text-gray-900">{{ item.name }} </h3>
                    <p>{{ formatCurrency (item.price) }}</p>
                    <p>Cantidad: {{ item.quantity }}</p>
                </div>

            </li>

        </ul>

                <dl class="space-y-3 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">    <!--Definicion de lista en HTML-->
                    <Amount>
                        <template #label>  <!--Uso el slot con el nombre-->
                            Subtotal: 
                        </template>
                        {{ formatCurrency(sale.subtotal) }} <!--Uso el slot por default-->
                    </Amount>

                    <Amount>
                        <template #label>  
                            IVA (12%): 
                        </template>
                        {{ formatCurrency(sale.taxes) }}
                    </Amount>
                    
                    <Amount v-if="sale.discount > 0" class="bg-green-200 p-2">
                        <template #label>  
                            Descuento:
                        </template>
                        {{ formatCurrency(sale.discount) }}
                    </Amount>


                    <Amount>
                        <template #label>  
                            Total pagado: 
                        </template>
                        {{ formatCurrency(sale.total) }}
                    </Amount>
                </dl>
                
         
    </div>

</template>

<script setup>
    
    import { formatCurrency } from '../helpers';
    import Amount from './Amount.vue';

    defineProps ({
        sale: {
            type: Object
        }
    })

</script>

