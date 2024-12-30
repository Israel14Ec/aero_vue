<template>
    <div class="flex justify-between p-1">
        <dt class="font-bold"> <!--Descripcion list en HTML-->
            <slot name="label"/>
        </dt>

        <dd class="text-gray-900"> <!--Descripcion de termino en HTML-->
            <slot>

            </slot>
        </dd>
    </div>
</template>
