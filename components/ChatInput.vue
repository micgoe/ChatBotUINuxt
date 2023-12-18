<script setup lang="ts">

const conversationStore = useConversationStore()
const input = ref<string>('')

const submitPrompt = () => {
  conversationStore.submitPrompt(input.value)
  input.value = ''
}

</script>

<template>
  <div>
    <div class="flex py-5">
      <UInput v-model="input" class="flex-1 pr-2 py-3"/>
      <UButton @click="submitPrompt()">Anfrage Senden</UButton>
    </div>
<!--    <UAlert v-show="conversationStore.submissionStatus.error" type="error">Fehler beim Senden der Anfrage</UAlert>-->
<!--    {{conversationStore.submissionStatus}}-->
<!--    <UProgress animation="carousel" v-show="conversationStore.submissionStatus.pending && !conversationStore.submissionStatus.inital"/>-->
  </div>
</template>

<style scoped>

</style>