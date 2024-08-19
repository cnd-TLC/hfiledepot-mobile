<template>
  <ion-page>
    <ion-header translucent >
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content color="light">
      <br />
      <ion-list-header>Appearance</ion-list-header>
      <ion-list :inset="true">
        <ion-item>
          <ion-toggle :checked="isDark" @ionChange="toggleDarkMode($event)" justify="space-between"
            >Dark Mode</ion-toggle
          >
        </ion-item>
        <ion-item>
          <ion-toggle :checked="isHighContrast" @ionChange="toggleHighContrast($event)" justify="space-between"
            >High Contrast Mode</ion-toggle
          >
        </ion-item>
      </ion-list>

      <!-- <ion-list :inset="true">
        <ion-item :button="true">Text Size</ion-item>
        <ion-item>
          <ion-toggle justify="space-between">Bold Text</ion-toggle>
        </ion-item>
      </ion-list>

      <ion-list-header>Brightness</ion-list-header>
      <ion-list :inset="true">
        <ion-item>
          <ion-range value="40">
            <ion-icon :icon="sunnyOutline" slot="start"></ion-icon>
            <ion-icon :icon="sunny" slot="end"></ion-icon>
          </ion-range>
        </ion-item>
        <ion-item>
          <ion-toggle justify="space-between" checked>True Tone</ion-toggle>
        </ion-item>
      </ion-list>

      <ion-list :inset="true">
        <ion-item :button="true">
          <ion-label>Night Shift</ion-label>
          <ion-text slot="end" color="medium">9:00 PM to 8:00 AM</ion-text>
        </ion-item>
      </ion-list> -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonPage, IonTitle, IonButtons, IonMenuButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonRange, IonText, IonToggle, IonToolbar } from '@ionic/vue';
import { sunnyOutline, sunny } from 'ionicons/icons';

const isDark = ref(false);
const isHighContrast = ref(false);

const loadSettings = () => {
  // Load settings from local storage
  const darkMode = localStorage.getItem('isDark') === 'true';
  const highContrast = localStorage.getItem('isHighContrast') === 'true';
  
  // Apply settings
  isDark.value = darkMode;
  isHighContrast.value = highContrast;
  
  // Apply class based on settings
  document.documentElement.classList.toggle('ion-palette-dark', darkMode);
  document.documentElement.classList.toggle('ion-palette-high-contrast', highContrast);
};

const saveSettings = () => {
  // Save settings to local storage
  localStorage.setItem('isDark', isDark.value.toString());
  localStorage.setItem('isHighContrast', isHighContrast.value.toString());
};

onMounted(() => {
  loadSettings();
  
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  prefersDark.addEventListener('change', (mediaQuery) => {
    // Update settings based on system preference
    isDark.value = !mediaQuery.matches;
    document.documentElement.classList.toggle('ion-palette-dark', isDark.value);
    saveSettings();
  });
});

const toggleDarkMode = (ev: any) => {
  isDark.value = ev.detail.checked;
  document.documentElement.classList.toggle('ion-palette-dark', isDark.value);
  saveSettings();
};

const toggleHighContrast = (ev: any) => {
  isHighContrast.value = ev.detail.checked;
  document.documentElement.classList.toggle('ion-palette-high-contrast', isHighContrast.value);
  saveSettings();
};
</script>


<style>
  /* (Optional) This is added to prevent the flashing that happens when toggling between palettes */
  ion-item {
    --transition: none;
  }
</style>