import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

//--------------Formkit--------------------------------------
import { plugin, defaultConfig } from '@formkit/vue' //Importo FormKit
import config from '../formkit.config' //Estoy importando formkit.config.js, en donde se le dara la apariencia del usuario


//--------------------- FireBase --------------------------
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'





import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(VueFire, { //Agrego firebase al proyecto
    firebaseApp,
    modules: [VueFireAuth()],
  })
app.use(createPinia())
app.use(plugin, defaultConfig(config)) //Formkit Configurado de forma global, no se debe importar en otros archivos
app.use(router)

app.mount('#app')
