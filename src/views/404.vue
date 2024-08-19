<template>
  <ion-page>
    <ion-content fullscreen color="light">
      <div id="container">
        <img :src="sorCityLogo" height="150" />
        <div>
          <h1> 404 </h1>
          <p> Page not found! </p>
          <ion-button router-direction="root" :router-link="'/Home'"> Go back </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { IonButton, IonContent, IonPage } from '@ionic/vue';
import { ref, reactive } from 'vue'
import { useAuth } from 'vue-auth3'
import { apiEndPoint } from '../../constant/data'
import sorCityLogo from '/images/sorsogoncity.png'

</script>
<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  justify-content: center;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container div {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
  padding: 20px;
}

#container div h1 {
  font-size: 100px;
  line-height: 50px;
}

#container a {
  text-decoration: none;
}
</style>
