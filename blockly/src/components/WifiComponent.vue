<script setup>
import { onMounted, ref } from "vue";
const props = defineProps(['wifi'])

</script>

<template>
  <h1>Configuration Wifi</h1>
  <div v-if="wifi.mode==='accessPoint'">
    <p>OoRoBoT en mode point d'accès sous le nom {{wifi.accessPoint.SSID}}</p>
    <p>Liste des box déjà renseignées</p>
    <select><option v-for="pwd, ssid  in wifi.saved">{{ssid}}</option></select>
    <button class="primary">Se connecter</button>
    <p>Liste des box détectées <button>recharger</button> :</p>
    <select><option v-for="ssid in wifi.scan">{{ssid}}</option></select><br>
    Mot de passe <input type="password" size=30/><br>
    <button class="primary">Se connecter</button>
  </div>
  <div v-else>
    <p>OoRoBoT connecté sur le Wifi {{wifi.box.SSID}}</p>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
