<template>
  <ion-app>
      <ion-menu content-id="main-content" type="overlay" :swipe-gesture="false">
        <ion-content>
          <ion-list id="menu-list">
            <div class="logo">
              <img :src="sorCityLogo" height="130" />
            </div> 
            <ion-list-header>HFile Depot</ion-list-header>
            <br/>
            <ion-note>Hi, {{ user.name }}!</ion-note>

            <ion-menu-toggle :auto-hide="false">
              <ion-item
                @click="selectItem('/home')"
                router-direction="root"
                :router-link="'/home'"
                lines="none"
                :detail="false"
                :class="{ selected: selectedIndex === '/home' }"
              >
                <ion-icon aria-hidden="true" slot="start" :ios="homeOutline" :md="homeOutline"></ion-icon>
                <ion-label>Home</ion-label>
              </ion-item>
              <ion-item
                @click="selectItem('/qr_stream')"
                router-direction="root"
                :router-link="'/qr_stream'"
                lines="none"
                :detail="false"
                :class="{ selected: selectedIndex === '/qr_stream' }"
              >
                <ion-icon aria-hidden="true" slot="start" :ios="qrCodeOutline" :md="qrCodeOutline"></ion-icon>
                <ion-label>Scan QR</ion-label>
              </ion-item>
              <ion-item
                @click="selectItem('/settings')"
                router-direction="root"
                :router-link="'/settings'"
                lines="none"
                :detail="false"
                :class="{ selected: selectedIndex === '/settings' }"
              >
                <ion-icon aria-hidden="true" slot="start" :ios="settingsOutline" :md="settingsOutline"></ion-icon>
                <ion-label>Settings</ion-label>
              </ion-item>
              <ion-item
                @click="logoutSubmit(), selectItem('/home')"
                lines="none"
                :detail="false"
              >
                <ion-icon aria-hidden="true" slot="start" :ios="logOutOutline" :md="logOutOutline"></ion-icon>
                <ion-label>Sign Out</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-app>
</template>
<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useAuth } from 'vue-auth3'
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRouterOutlet, IonSplitPane, onIonViewWillEnter } from '@ionic/vue';
import { qrCodeOutline, homeOutline, logOutOutline, settingsOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router'
import sorCityLogo from '/images/sorsogoncity.png'

const auth = useAuth()
const router = useRouter()

const selectedIndex = ref(router.currentRoute.value.path);
let loading = ref(true)
let userPromise = reactive({})
let user = reactive({
  id: '',
  name: '',
  role: '',
  department: '',
  status: '',
  email: '',
  permissions: []
})

const selectItem = (index: string) => {
  selectedIndex.value = index;
};

const checkPermission = (val: String) => {
  return user.permissions.includes(val)
}

const logoutSubmit = async () => {
  try {
    await auth.logout()
  }
  catch (err) {
    console.error('Logout failed: ', err)
  }
}

const getUserData = async () => {
  try {
    await auth.fetch().then(res => {
      Object.assign(userPromise, res)
      userPromise = userPromise.data[0]

      user.id = userPromise.id
      user.name = userPromise.name
      user.role = userPromise.role
      user.status = userPromise.status
      user.email = userPromise.email
      user.department = userPromise.department
      user.permissions = JSON.parse(userPromise.permissions)
    })
  }
  catch (err) {
    console.log(`Login failed: Credentials doesn't match!: `, err)
  }
  finally {
    loading.value = false
  }
}

watch(() => router.currentRoute.value, async (route) => {
  if(route.meta.auth)
    getUserData()
})
</script>
<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content,
ion-menu.ios ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#menu-list {
  border-bottom: 1px solid var(--ion-background-color-step-150, #d7d8da);
}

ion-menu.md ion-list#menu-list ion-list-header {
  font-size: 22px;
  font-weight: 600;
  min-height: 20px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;
  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}

img {
  margin-bottom: 30px;
}

.logo {
  display: flex;
  justify-content: center;
}
</style>
