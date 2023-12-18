<script setup lang="ts">

import {MessageOwner} from "~/stores/converstation-store";

const conversationStore = useConversationStore()

</script>

<template>
  <div>
    <div class="flex py-5">
      <UInput v-model="conversationStore.activeMessage" class="flex-1 pr-2 py-3"/>
      <UButton @click="conversationStore.submitPrompt()">Anfrage Senden</UButton>
    </div>
    <UAlert v-show="conversationStore.submissionStatus.error" type="error">Fehler beim Senden der Anfrage</UAlert>
<!--    {{conversationStore.submissionStatus}}-->
    <UProgress animation="carousel" v-show="conversationStore.submissionStatus.pending && !conversationStore.submissionStatus.inital"/>
  </div>
</template>

<style scoped>

</style>