<template>
  <ion-page>
    <ion-content fullscreen>
      <div id="container">
        <img :src="sorCityLogo" height="150" />
        <div @keyup.enter="signinSubmit()">
          <ion-input id="username" label="Username" label-placement="floating" fill="outline" placeholder="Enter username" v-model="username" tabindex="1" autofocus></ion-input>
          <p v-if="usernameError" class="input-error"> {{ usernameError }} </p>
          <br />
          <ion-input id="password" type="password" label="Password" label-placement="floating" fill="outline" placeholder="Enter password" v-model="password" tabindex="2"></ion-input>
          <p v-if="passwordError" class="input-error"> {{ passwordError }} </p>

          <div class="error">
            {{ error }}
          </div>
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
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import sorCityLogo from '/images/sorsogoncity.png'

const error = ref('')

const signInButtonIsDisabled = ref(false)

const auth = useAuth()

const schema = object({
  username: string().required("Username is required"),
  password: string().required("Password is required"),
})

const { handleSubmit, resetForm, errors } = useForm({
  validationSchema: schema,
})

const { value: username, errorMessage: usernameError } = useField("username")
const { value: password, errorMessage: passwordError } = useField("password")

const signinSubmit = handleSubmit(async (values) => {
  if (signInButtonIsDisabled.value) 
  	return;
  
  try {
  	signInButtonIsDisabled.value = true
  	await auth.login({
  		data: values,
  	})
  	.then((res) => {
      resetForm()
      error.value = ''
  	})
  }
  catch (err) {
  	if (err.message == 'Network Error!')
  		error.value = `Login failed: ${err.message}!`
  	else
      error.value = `Credential's doesn't match any records.`
  }
  finally {
  	signInButtonIsDisabled.value = false
  }
})
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 45%;
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

.error {
  padding: 10px !important;
  display: flex;
  justify-content: center;
  color: #f56c6c !important;
}

.input-error {
  padding: 0 !important;
  margin: 0 !important;
  color: #f56c6c !important;
}
</style>
