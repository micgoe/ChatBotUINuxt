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
      <UTextarea v-model="input" color="primary" class="grow  w-full pr-2 py-3" size="xl" variant="outline" placeholder="Wann bekomme ich Sonderurlaub? ..." textareaClass="test" :autofocus="true"/>
      <UButton @click="submitPrompt()" size="lg" icon="i-heroicons-rocket-launch" :disabled="conversationStore.isBlocked">Anfrage senden</UButton>
<!--      <UButton @click="submitPrompt()" size="lg" icon="i-heroicons-rocket-launch" :disabled="conversationStore.isBlocked">Anfrage senden</UButton>-->
    </div>
  </div>
</template>

<style scoped>

</style>