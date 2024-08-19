<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>QR Stream</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen color="light">
      <div id="container">
        <strong class="capitalize">QR Scanner</strong>
        <p ><i>Place your QR in front of camera </i></p>
        <div>
          <qrcode-stream v-if="qrCodeStreamMount" :constraints="selectedConstraints" :track="trackFunctionSelected.value" @detect="handleDetect" @camera-on="onCameraReady">
            <div
              class="loading-indicator"
              v-if="loading"
            >
              <ion-spinner name="circles"></ion-spinner>
            </div>
          </qrcode-stream>
          <br />
          <ion-list-header>Scanner Options</ion-list-header>
          <ion-list :inset="true">
            <ion-item>
              <ion-select label="Camera Options" interface="action-sheet" placeholder="Default (Rear Camera)" @ionChange="updateConstraints">
                <ion-select-option v-for="option in constraintOptions" :key="option.label" :value="option.constraints">{{ option.label }}</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item>
              <ion-select label="Track Functions" interface="action-sheet" placeholder="Default (Nothing)" @ionChange="updateTrackFunction">
                <ion-select-option v-for="option in trackFunctionOptions" :key="option.text" :value="option">{{ option.text }}</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
  import { ref  } from 'vue'
  import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonLoading, IonSpinner, IonList, IonItem, IonListHeader, onIonViewWillLeave, onIonViewWillEnter } from '@ionic/vue';
  import { QrcodeDropZone, QrcodeCapture, QrcodeStream } from 'vue-qrcode-reader';
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const loading = ref(true)
  const qrCodeStreamMount = ref(true)

  const selectedConstraints = ref({ facingMode: 'environment' })
  const defaultConstraintOptions = [
    { label: 'Rear Camera', constraints: { facingMode: 'environment' } },
    { label: 'Front Camera', constraints: { facingMode: 'user' } },
  ]
  const constraintOptions = ref(defaultConstraintOptions)

  const onCameraReady = async () => {
    loading.value = false
    // NOTE: on iOS we can't invoke `enumerateDevices` before the user has given
    // camera access permission. `QrcodeStream` internally takes care of
    // requesting the permissions. The `camera-on` event should guarantee that this
    // has happened.
    const devices = await navigator.mediaDevices.enumerateDevices()
    const videoDevices = devices.filter(({ kind }) => kind === 'videoinput')

    constraintOptions.value = [
      ...defaultConstraintOptions,
      ...videoDevices.map(({ deviceId, label }) => ({
        label: `${label}`,
        constraints: { deviceId }
      }))
    ]

    // error.value = ''
  }

  const paintOutline = (detectedCodes, ctx) => {
    for (const detectedCode of detectedCodes) {
      const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

      ctx.strokeStyle = 'red'

      ctx.beginPath()
      ctx.moveTo(firstPoint.x, firstPoint.y)
      for (const { x, y } of otherPoints) {
        ctx.lineTo(x, y)
      }
      ctx.lineTo(firstPoint.x, firstPoint.y)
      ctx.closePath()
      ctx.stroke()
    }
  }
  const paintBoundingBox = (detectedCodes, ctx) => {
    for (const detectedCode of detectedCodes) {
      const {
        boundingBox: { x, y, width, height }
      } = detectedCode

      ctx.lineWidth = 4
      ctx.strokeStyle = '#007bff'
      ctx.strokeRect(x, y, width, height)
    }
  }
  const paintCenterText = (detectedCodes, ctx) => {
    for (const detectedCode of detectedCodes) {
      const { boundingBox, rawValue } = detectedCode

      const centerX = boundingBox.x + boundingBox.width / 2
      const centerY = boundingBox.y + boundingBox.height / 2

      const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)

      ctx.font = `bold ${fontSize}px sans-serif`
      ctx.textAlign = 'center'

      ctx.lineWidth = 3
      ctx.strokeStyle = '#35495e'
      ctx.strokeText(detectedCode.rawValue, centerX, centerY)

      ctx.fillStyle = '#5cb984'
      ctx.fillText(rawValue, centerX, centerY)
    }
  }
  const trackFunctionOptions = [
    { text: 'Nothing (default)', value: undefined },
    { text: 'Outline', value: paintOutline },
    { text: 'Centered Text', value: paintCenterText },
    { text: 'Bounding Box', value: paintBoundingBox }
  ]
  const trackFunctionSelected = ref(trackFunctionOptions[0])

  const updateConstraints = (event: CustomEvent) => {
    selectedConstraints.value = event.detail.value
  }

  const updateTrackFunction = (event: CustomEvent) => {
    trackFunctionSelected.value = event.detail.value
  }

  // Event handler for QR code detection
  const handleDetect = (result: any) => {
    const url = result[0]?.rawValue
    router.push({ name: 'qr_purchase_request', params: { 
          axiosUrl: url,
      } })
  };

  onIonViewWillEnter(() => {
    qrCodeStreamMount.value = true
  })

  onIonViewWillLeave(() => {
    qrCodeStreamMount.value = false
  })
</script>
<style scoped>
  #container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 10%;
  }

  #container strong {
    font-size: 20px;
    line-height: 26px;
  }

  #container p {
    line-height: 0px;
  }

  #container div {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
    padding: 10px;
  }

  #container a {
    text-decoration: none;
  }

  .dropzone {
    border: 1px dashed #909399;
  }

  .loading-indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #ddd;
  }
</style>
