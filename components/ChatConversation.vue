<script setup lang="ts">
import {useConversationStore} from "~/stores/converstation-store";

const conversationStore = useConversationStore()

</script>

<template>
  <div class="border p-6 flex flex-col">
    <ChatConversationMessage v-for="({message, owner}, index) in conversationStore.conversation" :key="index" :owner="owner">
      {{message}}
    </ChatConversationMessage>
  </div>
</template>

<style scoped>

</style>