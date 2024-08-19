import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

// vue auth 3
import { createAuth } from 'vue-auth3'
import driverAuthBearer from 'vue-auth3/drivers/auth/bearer'
import driverHttpAxios from 'vue-auth3/drivers/http/axios'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

// import '@ionic/vue/css/palettes/dark.always.css'; 
import '@ionic/vue/css/palettes/dark.class.css'; 
// import '@ionic/vue/css/palettes/dark.system.css';
import '@ionic/vue/css/palettes/high-contrast.class.css';
import '@ionic/vue/css/palettes/high-contrast-dark.class.css';

/* Theme variables */
import './theme/variables.css';

import { apiEndPoint } from './constant/data'

const auth = createAuth({
  plugins: {
    router,
  },
  drivers: {
    auth: driverAuthBearer,
    http: driverHttpAxios,
  },
  rememberkey: 'auth_remember',
  tokenDefaultKey: 'auth_token_default',
  tokenImpersonateKey: 'auth_token_impersonate',
  stores: ['storage', 'cookie'],
  loginData: {
    method: 'post',
      url: `${apiEndPoint}/api/login`,
      redirect: { name: 'home' },
      staySignedIn: true,
      fetchUser: true,
      // rememberMe: true,
  },
  logoutData: {
      method: 'post',
      url: `${apiEndPoint}/api/logout`,
      makeRequest: true,
      redirect: { name: 'signin' }
    },
  fetchData: {
    method: 'get',
    url: `${apiEndPoint}/api/user`, 
    enabled: true
  },
  refreshData: { 
    method: 'get',
    url: `${apiEndPoint}/api/refresh`, 
    interval: 1,
    enabled: true 
  }
})

const app = createApp(App)

app.use(router).use(IonicVue).use(auth).mount('#app')

