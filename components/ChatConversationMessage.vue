<script setup lang="ts">

import type {Status} from "~/composables/usePrompt";

const props = defineProps<{
  question: string,
  answer: string,
  submissionStatus: Status,
}>()

// const dynamicStyle = computed(() => {
//   return {
//     'self-end': props.owner === MessageOwner.User,
//     // 'bg-blue-100': props.owner === MessageOwner.User,
//   }
// })

</script>

<template>
  <div class="py-2 min-w-xl max-w-3xl self-end" >
    <UCard class="bg-blue-100">
      {{ question }}
    </UCard>
  </div>
  <div class="py-2 min-w-xl max-w-3xl" >
    <UCard class="bg-blue-100">
      {{ answer }}
      <template #footer >
        {{ props.submissionStatus.error }}
        <UProgress animation="carousel" v-show="props.submissionStatus.pending && !props.submissionStatus.initial"/>
      </template>
    </UCard>

  </div>
</template>

<style scoped>

</style>