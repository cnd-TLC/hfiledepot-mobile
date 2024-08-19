<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button color="primary" defaultHref="/qr_stream" :icon="caretBack" text="Back"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen color="light">
      <div id="container">
        <div class="pr-heading">
          <p> <i> This document contains confidential information intended solely for the viewer. Unauthorized review, use, or distribution is prohibited. </i> </p>
          <img :src="sorCityLogo" height="150" />
        </div>
        <div style="padding-bottom: 0;">
          <p> <i> This PR is currently at {{ currentOffice }} </i> </p>
          <ion-progress-bar color="success" :buffer="buffer" :value="progress"></ion-progress-bar>
        </div>
        <div style="padding-top: 0;">
          <ion-list>
            <ion-item-group>
              <ion-item-divider>
                <ion-label class="pr-heading"> 
                  <p> PR last updated @ {{ new Date(prDetails.updated_at).toDateString() }} </p>
                  <ion-chip v-if="prDetails.status == 'Approved'" color="success">Approved</ion-chip>
                  <ion-chip v-if="prDetails.status == 'Pending'" color="warning">Pending</ion-chip>
                  <ion-chip v-if="prDetails.status == 'Rejected'" color="danger">Rejected</ion-chip>
                </ion-label>
              </ion-item-divider>
              <ion-item>
                <ion-label>  <span class="title"> Requested by </span> : <br /> <b> {{ prDetails.department }} </b> <br /> <i> on {{ new Date(prDetails.created_at).toDateString() }} </i> </ion-label>
              </ion-item>
              <ion-item>
                <ion-label>  <span class="title"> Purpose </span> : <br /> <b> {{ prDetails.purpose }} </b> </ion-label>
              </ion-item>
              <ion-item v-if="prDetails.pr_no">
                <ion-label>  <span class="title"> PR Number </span> : <br /> <b> {{ prDetails.pr_no }} </b> </ion-label>
              </ion-item>
              <ion-item v-if="prDetails.fund">
                <ion-label>  <span class="title"> Fund </span> : <br /> <b> {{ prDetails.fund }} </b> </ion-label>
              </ion-item>
              <ion-item v-if="prDetails.fpp">
                <ion-label>  <span class="title"> FPP </span> : <br /> <b> {{ prDetails.fpp }} </b> </ion-label>
              </ion-item>
              <ion-accordion-group>
                <ion-accordion value="inclusions">
                  <ion-item slot="header" class="accordion">
                    <ion-label> <span class="title"> Inclusions </span></ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <div v-if="prDetails.bac_resolution == null && prDetails.canvass == null && prDetails.purchase_order == null && prDetails.obr == null && prDetails.ris == null && prDetails.inspection_acceptance == null && prDetails.abstract == null && prDetails.voucher == null && prDetails.notice_of_awards == null && prDetails.notice_to_proceed == null && prDetails.contract_of_agreement == null && prDetails.lcrb == null" >
                      <p class="no-inclusions"> No inclusions found</p>
                    </div>
                    <div>
                      <p class="inclusions" v-if="prDetails.bac_resolution"> <ion-icon :icon="checkmarkCircle"></ion-icon> with BAC Resolution ({{ new Date(prDetails.bac_resolution).toDateString() }}) </p>
                      <p class="inclusions" v-if="prDetails.canvass"> <ion-icon :icon="checkmarkCircle"></ion-icon> with Canvass ({{ new Date(prDetails.canvass).toDateString() }}) </p>
                      <p class="inclusions" v-if="prDetails.purchase_order"> <ion-icon :icon="checkmarkCircle"></ion-icon> with Purchase Order ({{ new Date(prDetails.purchase_order).toDateString() }}) </p>
                      <p class="inclusions" v-if="prDetails.obr"> <ion-icon :icon="checkmarkCircle"></ion-icon> with OBR ({{ new Date(prDetails.obr).toDateString() }}) </p>
                      <p class="inclusions" v-if="prDetails.ris"> <ion-icon :icon="checkmarkCircle"></ion-icon> with RIS ({{ new Date(prDetails.ris).toDateString() }}) </p>
                      <p class="inclusions" v-if="prDetails.inspection_acceptance"> <ion-icon :icon="checkmarkCircle"></ion-icon> with Inspection/Acceptance ({{ new Date(prDetails.inspection_acceptance).toDateString() }}) </p>
                      <p class="inclusions" v-if="prDetails.abstract"> <ion-icon :icon="checkmarkCircle"></ion-icon> with Abstract ({{ new Date(prDetails.abstract).toDateString() }}) </p>
                      <p class="inclusions" v-if="prDetails.voucher"> <ion-icon :icon="checkmarkCircle"></ion-icon> with Voucher ({{ new Date(prDetails.voucher).toDateString() }}) </p>
                      <p class="inclusions" v-if="prDetails.notice_of_awards"> <ion-icon :icon="checkmarkCircle"></ion-icon> with Notice of Awards ({{ new Date(prDetails.notice_of_awards).toDateString() }}) </p>
                      <p class="inclusions" v-if="prDetails.notice_to_proceed"> <ion-icon :icon="checkmarkCircle"></ion-icon> with Notice to Proceed ({{ new Date(prDetails.notice_to_proceed).toDateString() }}) </p>
                      <p class="inclusions" v-if="prDetails.contract_of_agreement"> <ion-icon :icon="checkmarkCircle"></ion-icon> with Contract of Agreement ({{ new Date(prDetails.contract_of_agreement).toDateString() }}) </p>
                      <p class="inclusions" v-if="prDetails.lcrb"> <ion-icon :icon="checkmarkCircle"></ion-icon> with LCRB ({{ new Date(prDetails.lcrb).toDateString() }}) </p>
                    </div>
                  </div>
                </ion-accordion>
                <!-- <ion-accordion value="attachments">
                  <ion-item slot="header" class="accordion">
                    <ion-label>Attachments</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">First Content</div>
                </ion-accordion> -->
              </ion-accordion-group>
              <br />
              <ion-item-divider v-if="prItems.length > 0 ">
                <ion-label> Items </ion-label>
              </ion-item-divider>
              <ion-accordion-group>
                <ion-accordion v-for="(item, key) in prItems" :value="key">
                  <ion-item slot="header" class="accordion">
                    <ion-label> <b> {{ item.item_no }} - {{ item.item_description }} </b> </ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <div>
                      <b class="items"> {{ item.item_description }} </b>
                      <!-- <p class="items"> Category : {{ item.category }} </p> -->
                      <p class="items"> Quantity : <span v-if="item.lumpsum"> Lumpsum </span> <span v-else> {{ item.quantity }} {{ item.unit }}/s </span> </p>
                      <!-- <p class="items"> Mode : {{ item.mode_of_procurement }} </p> -->
                      <p class="items"> Unit Cost : ₱ {{ formatNumber(item.unit_cost) }} </p>
                      <p class="items"> Total Cost : ₱ <span v-if="item.lumpsum"> {{ formatNumber(item.unit_cost) }} </span> <span v-else> {{ formatNumber(item.unit_cost * item.quantity) }} </span> </p>
                    </div>
                  </div>
                </ion-accordion>
              </ion-accordion-group>
            </ion-item-group>
          </ion-list>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
  import { IonButton, IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonList, IonItemGroup, IonItemDivider, IonLabel, IonItem, IonAccordion, IonAccordionGroup, IonIcon, IonChip, IonProgressBar } from '@ionic/vue';
  import { caretBack, checkmarkCircle } from 'ionicons/icons';
  import { ref, reactive } from 'vue'
  import { useAuth } from 'vue-auth3'
  import { apiEndPoint } from '../../constant/data'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  import sorCityLogo from '/images/sorsogoncity.png'

  const router = useRouter().currentRoute.value

  const prDetails = ref([])
  const prItems = ref([])
  const progress = ref(.142)
  const buffer = ref(0)
  const currentOffice = ref('Budget Office')

  const formatNumber = (number) => {
    number = parseFloat(number).toFixed(2)
    let numStr = number.toString();
      let parts = numStr.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
  }

  const getPr = async () => {
    const token = JSON.parse(localStorage.auth_token_default);
    if(token){
      axios.defaults.headers = {
        accept: "application/json",
        Authorization: `Bearer ${token}`
      }  
    }
    try {
      axios.get(router.params.axiosUrl).then((res) => {
        prDetails.value = res.data.retrievedData
        prItems.value = res.data.retrievedItemData
        if (prDetails.value.approved_by_cbo_name){
          progress.value += .142
          if (prDetails.value.approved_by_cto_name){
            currentOffice.value = 'Treasury Office'
            progress.value += .142
            if (prDetails.value.approved_by_cmo_name){
              currentOffice.value = 'Mayor\'s Office'
              progress.value += .142
              if (prDetails.value.approved_by_bac_name){
                currentOffice.value = 'BAC Office'
                progress.value += .142
                if(prDetails.value.approved_by_cgso_name){
                currentOffice.value = 'CGSO Office'
                  progress.value += .142
                  if (prDetails.value.approved_by_cao_name)
                    currentOffice.value = 'Accounting Office'
                    progress.value += .142
                }
              }
            }
          }
        }
      })
    }
    catch (err) {
      console.log(err.message)
    }
  }

  getPr()
</script>
<style scoped>
#container {
  text-align: left;
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 20px;
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
  font-size: 50px;
  line-height: 50px;
}

#container a {
  text-decoration: none;
}

.no-inclusions, .inclusions, .ion-padding, .items {
  padding: 0 !important;
  margin: 4px 0 !important;
}

.ion-padding div {
  padding: 0 20px 0 20px !important;
}

i {
  color: var(--ion-color-primary, #0054e9) !important;
  font-size: 14px;
}

b {
  color: var(--ion-color-primary, #0054e9) !important;
}

.inclusions {
  color: var(--ion-color-primary, #0054e9) !important;
}

.title {
  color: var(--ion-color-step-400, var(--ion-text-color-step-600, #333333));
}

.items {
  color: var(--ion-color-step-400, var(--ion-text-color-step-600, #333333)) !important;
}

.pr-heading {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pr-heading p {
  text-align: justify;
  margin-right: 20px;
}

</style>
