import {computed, ref} from 'vue'
import { defineStore} from 'pinia'
import {useFirestore, useCollection, useFirebaseStorage} from 'vuefire'
import {collection, addDoc, where, query, limit, orderBy, updateDoc, doc, getDoc, deleteDoc} from 'firebase/firestore'
import {ref as storageRef, deleteObject} from 'firebase/storage'

export const useProductStore = defineStore('products', () => {
    
    const db = useFirestore()   //Conexion a firestore
    const storage = useFirebaseStorage() //Conexión a storage

    const selectedCategory = ref(1)

    const categories = [ 
        { id: 1, name:'Sudaderas'},
        { id: 2, name:'Tenis'},
        { id: 3, name:'Lentes'},
    ]


    const q = query(
        collection(db, 'products'),
    )

    const productsCollection = useCollection(q) //Obtengo de firestore los productos
    

    async function createProduct(product){
        await addDoc(collection(db, 'products'), product) //Guardamos en firestore
    }

  
    //Actualización del producto
    async function updateProduct(docRef, product) {
        const { image, url, ...values} = product //le quito la imagen

        console.log(image.length)
        if(image.length) {
            await updateDoc(docRef, {
                ...values,
                image: url.value,
            })
        } else {
            await updateDoc(docRef, values) //actualiza en firebase, en caso de no tener una imagen nueva
        }
    }


      //Eliminar producto
      async function deleteProduct (id){
        if(confirm('Eliminar Producto')){
            //Obtengo la referencia del documento
            const docRef = doc(db, 'products', id)
            const docSnap = await getDoc(docRef) //Otengo el documento a eliminar
            const {image} = docSnap.data() //Uso destructuring para obtener la url de la imagen
            const imageRef = storageRef(storage, image) //Refrencia de la imagen en storage

            //Eliminar documento de firestore y storage
            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef)
            ])

        }
      }


    //Computed para categoria
    const categoryOptions = computed(() => {
        const options = [
            //Primera opcion
            {label: '-- Selecione --', value:'', attrs: {disabled: true}},
            ...categories.map(category => (
                {label: category.name, value: category.id}
            ))
        ]

        return options
    })

    //computed para el filtrado de datos

    const filterProducts = computed(() => {
        return productsCollection.value
            .filter( product => product.category === selectedCategory.value)
            .filter (product => product.availability > 0)
    })

    const noResults = computed(() => productsCollection.value.length === 0)

    return {
        createProduct,
        categoryOptions,
        productsCollection,
        categories,
        selectedCategory,
        noResults,
        updateProduct,
        deleteProduct,
        filterProducts
    }
})