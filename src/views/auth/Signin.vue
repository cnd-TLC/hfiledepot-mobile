<template>
  <ion-page>
    <ion-content fullscreen>
      <div id="container">
        <img :src="sorCityLogo" height="150" />
        <div @keyup.enter="signinSubmit()">
          <ion-input id="username" label="Username" label-placement="floating" fill="outline" placeholder="Enter username" v-model="form.username" tabindex="1" autofocus></ion-input>
          <br />
          <ion-input id="password" type="password" label="Password" label-placement="floating" fill="outline" placeholder="Enter password" v-model="form.password" tabindex="2"></ion-input>
          <br />
          <ion-button expand="block" size="large" @click="signinSubmit()" :disabled="signInButtonIsDisabled" tabindex="3">
          	Sign in
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { IonButton, IonContent, IonPage, IonInput } from '@ionic/vue';
import { ref, reactive } from 'vue'
import { useAuth } from 'vue-auth3'
import { apiEndPoint } from '../../constant/data'
import sorCityLogo from '/images/sorsogoncity.png'

const form = reactive({
  username: '',
  password: ''
})

const signInButtonIsDisabled = ref(false)

const auth = useAuth()

const signinSubmit = async () => {
  if (signInButtonIsDisabled.value) 
  	return;
  
  try {
  	signInButtonIsDisabled.value = true
  	await auth.login({
  		data: {
  			username: form.username,
  			password: form.password
  		},
  	})
  	.then((res) => {
      form.username = ''
      form.password = ''
  		console.log(`Welcome, ${res.data.user.name}!`)
  	})
  }
  catch (err) {
  	if (err.message == 'Network Error!')
  		console.log(`Login failed: ${err.message}!`)
  	else
  		console.log(`Login failed: Credentials doesn't match!`)
  }
  finally {
  	signInButtonIsDisabled.value = false
  }
}

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

#container div {
  text-align: left;
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
  padding: 20px;
}

#container a {
  text-decoration: none;
}
</style>
