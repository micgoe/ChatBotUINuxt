<script setup lang="ts">
// import type {MessageOwner} from "~/stores/converstation-store";
// import type {PropType} from "vue";

const props = defineProps({
    owner: {
      type: Number,
      required: true
    },

  })

const dynamicStyle = computed(() => {
  return {
    'self-end': props.owner === MessageOwner.User,
    // 'bg-blue-100': props.owner === MessageOwner.User,
  }
})

</script>

<template>
  <div class="py-2 min-w-xl max-w-3xl" :class="dynamicStyle">
    <UCard class="bg-blue-100">
      {{ MessageOwner.User}}
      <slot />
    </UCard>
  </div>
</template>

<style scoped>

</style>