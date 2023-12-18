<script setup lang="ts">

const conversationStore = useConversationStore()

</script>

<template>
  <UButtonGroup size="sm" orientation="horizontal" class="py-4" >
    <UButton label="Login" color="white" />
    <UButton label="Zurücksetzen" color="white" icon="i-heroicons-trash" @click="conversationStore.resetConversation()"/>
  </UButtonGroup>
</template>

<style scoped>

</style>