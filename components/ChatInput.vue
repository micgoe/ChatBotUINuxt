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
    <div class=" flex items-center py-5 gap-4 justify-end place-content-stretch">
<!--      <UInput v-model="input" class="flex-1 pr-2 py-3"/>-->
      <UTextarea v-model="input" color="primary grow max-w-2xl w-80 pr-2 py-3" size="xl" variant="outline" placeholder="Wann bekomme ich Sonderurlaub? ..." />

      <UButton @click="submitPrompt()" size="lg" icon="i-heroicons-rocket-launch">Anfrage senden</UButton>
    </div>
<!--    <UAlert v-show="conversationStore.submissionStatus.error" type="error">Fehler beim Senden der Anfrage</UAlert>-->
<!--    {{conversationStore.submissionStatus}}-->
<!--    <UProgress animation="carousel" v-show="conversationStore.submissionStatus.pending && !conversationStore.submissionStatus.inital"/>-->
  </div>
</template>

<style scoped>

</style>