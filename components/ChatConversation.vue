<script setup lang="ts">
import {useConversationStore} from "~/stores/converstation-store";

const conversationStore = useConversationStore()

</script>

<template>
  <div class="border p-6 flex flex-col">
    <ChatStarters v-show="conversationStore.conversation.length === 0"/>
    <ChatConversationMessage v-for="({question, answer, submissionStatus}, index) in conversationStore.conversation" :key="index" :question="question" :answer="answer" :submission-status="submissionStatus" />
  </div>
</template>

<style scoped>

</style>