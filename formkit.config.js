//Aqui añadimos el código de tailwind o css

import { generateClasses} from '@formkit/themes'

const config = {
    config: {

        classes: generateClasses({

            global: { //Selecciona globalmente los elementos
                label: 'block mb-1 font-bold text-lg',
                message: 'text-red-500 mb-5',
                wrapper: 'space-y-2 mb-3',
                input: 'w-full p-3 border border-gray-300 rounded text-gray-700 placeholder-gray-400'
            },
            text: {
                //message: '$rese text-green-500' //Se resea el elemento del texto y no se aplica el diseño
                
            },
            file: {
                noFiles: 'block my-2',
                fileItem: 'hidden' //Le quita la funcionalidad para quitar imagenes

            },
       
            submit: {
                input: '$reset bg-green-400 hover:bg-green-500 w-full p-2 font-bold uppercase disabled:opacity-50'
            }
        })
    }
}

export default config

