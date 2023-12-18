<script setup lang="ts">

const conversationStore = useConversationStore()

const starters = [
    'Wann bekomme ich Sonderurlaub?',
    'Wie hoch ist das Coworking Budget?',
    'Wann wird mein Hardware Budget erneuert?',
    'Was ist ein ESG Reporting?'
]

const submitPrompt = (index: number) => {
    conversationStore.submitPrompt(starters[index])
}


</script>

<template>
  <div class="flex gap-4">
    <UButton v-for="(question, index) in starters" :key="index" color="gray" variant="solid" @click="submitPrompt(
    index)">
      {{ question }}
    </UButton>
  </div>
</template>

<style scoped>

</style>