<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>WhatsApp Link</v-app-bar-title>
      <v-menu right>
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in menu" :key="index" @click="openMenuUrl(item.url)">
            <template #prepend>
              <v-icon>{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-form ref="form" @submit.prevent>
          <v-row no-gutters>
            <v-col cols="auto">
              <v-select class="mr-2" v-model="countryCodeContent" color="accent" variant="outlined" label="País" :items="countriesCode" :rules="[validateCountryCode]"></v-select>
            </v-col>
            <v-col>
              <v-text-field v-model="phoneNumberContent" type="tel" color="accent" variant="outlined" label="N° telefone" :rules="[validatePhoneNumber]"></v-text-field>
            </v-col>
          </v-row>
          <v-textarea class="mt-2" v-model="messageContent" rows="5" color="accent" variant="outlined" label="Mensagem"></v-textarea>
          <v-btn color="primary" variant="flat" @click="generateLink()" block>Gerar link</v-btn>
        </v-form>
        <v-text-field class="mt-5" v-model="outputContent" color="accent" variant="outlined" label="Saída" readonly>
          <template #append-inner>
            <v-icon @click="copyToClipboard()">{{ copyIcon }}</v-icon>
          </template>
        </v-text-field>
      </v-container>
    </v-main>
    <v-snackbar v-model="snackbar">
      Não foi possível copiar, navegador incompatível
      <template #actions>
        <v-btn color="error" @click="snackbar = false" icon>
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
<script setup lang="ts">
  import { ref } from "vue"
  import countriesList from "countries-list"
  import parsePhoneNumber from "libphonenumber-js"
  
  const iconCopy = "mdi-content-copy"
  const iconCheck = "mdi-check"
  const form = ref(null)
  const countryCodeContent = ref("")
  const phoneNumberContent = ref("")
  const messageContent = ref("")
  const outputContent = ref("")
  const snackbar = ref(false)
  const copyIcon = ref(iconCopy)
  const countriesCode = Object.entries(countriesList.countries).map((value) => {
    return `${value[0]} ${value[1].phone} ${value[1].emoji}`
  })
  const menu = ref([
    {
      title: "GitHub",
      icon: "mdi-github",
      url: "https://github.com/jhondesignee"
    },
    {
      title: "WhatsApp",
      icon: "mdi-whatsapp",
      url: "https://wa.me/message/O2NSJ44ZIVUEF1"
    },
    {
      title: "Instagram",
      icon: "mdi-instagram",
      url: "https://instagram.com/guy.named.princess"
    },
    {
      title: "LinkedIn",
      icon: "mdi-linkedin",
      url: "https://linkedin.com/in/jhondesignee"
    },
    {
      title: "Twitter",
      icon: "mdi-twitter",
      url: "https://twitter.com/jhondesignee"
    },
    {
      title: "Facebook",
      icon: "mdi-facebook",
      url: "https://www.facebook.com/profile.php?id=100088240418980"
    }
  ])
  
  function openMenuUrl(url: string): void {
    if (process.client) {
      window.open(url, "_blank")
    }
  }
  
  function getPhoneNumber(): string {
    return parsePhoneNumber(phoneNumberContent.value, countryCodeContent.value.slice(0, 2))
  }
  
  function validatePhoneNumber(): void {
    const phoneNumber = getPhoneNumber()
    if (!phoneNumberContent.value) return "Insira o número"
    if (!phoneNumber?.isValid()) return "Número inválido"
    return true
  }
  
  function validateCountryCode(): void {
    return Boolean(countryCodeContent.value) || "Selecione um país"
  }
  
  async function generateLink(): void {
    const isFormValid = (await form.value.validate()).valid
    
    if (isFormValid) {
      const phoneNumber = getPhoneNumber().number.slice(1)
      const message = encodeURIComponent(messageContent.value)
      const link = `https://wa.me/${phoneNumber}${message ? "?text=" + message : ""}`
      outputContent.value = link
    }
  }
  
  function checkCopyIcon(): void {
    copyIcon.value = iconCheck
    setTimeout(() => copyIcon.value = iconCopy, 5000)
  }
  
  async function copyToClipboard(): void {
    if (process.client) {
      try {
        await navigator?.clipboard?.writeText(outputContent.value)
        checkCopyIcon()
      } catch(error) {
        snackbar.value = true
      }
    }
  }
</script>