<script setup lang="ts">

import type {Status} from "~/composables/usePrompt";
import {marked} from "marked";

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

const isPending = computed(() => props.submissionStatus.pending)

const answerFormated = computed(() => {
  const text = replaceLinksWithMarkdownLink(props.answer)
  return marked.parse(text)
})


function replaceLinksWithMarkdownLink(text: string) {
  const regex = /\[(.*?)\]/g;
  var index = 1
  return text.replace(regex, (_, capturedText) => {
    const url = encodeURIComponent(`https://demostorage0nx2l.blob.core.windows.net/esg/${capturedText}`)
    const replacement = `[${index}](${url})`
    index++
    return replacement
  });
}
</script>

<template>
  <div class="py-2 min-w-xl max-w-3xl self-end" >
    <UCard class="bg-green-500 text-white">
      {{ question }}
    </UCard>
  </div>
  <div class="py-2 min-w-xl max-w-3xl" >
    <UCard class="bg-green-50 whitespace-pre-line" >
      <span v-html="answerFormated" class="chat-answer prose prose-md"></span>
      <div class="space-y-2" v-if="isPending && answer.length === 0">
        <USkeleton class="h-4 w-[250px]" :ui="{background: 'bg-green-300 dark:bg-green-800'}" />
        <USkeleton class="h-4 w-[200px]" :ui="{background: 'bg-green-200 dark:bg-green-600'}"/>
      </div>
      <template #footer >
        <UAlert
            v-if="submissionStatus.error"
            icon="i-heroicons-command-line"
            :description="props.submissionStatus.error"
            title="Fehler"
        />
        <UProgress animation="carousel" v-show="isPending"/>
      </template>
    </UCard>

  </div>
</template>

<style>

.chat-answer {
  a {
    &::before {
      content: '[';
    }
    &::after {
      content: ']';
    }
    @apply text-green-600 underline;
    @apply font-bold;
  }
}

</style>