<script setup lang="ts">

const conversationStore = useConversationStore()
const input = ref<string>('')
const error = ref<string>('')

const isOpen = computed(() => {
  return !conversationStore.email
})

// const isOpen2 = ref(true)

const startChat = () => {
  validateEmail()
  if (error.value) {
    return
  }
  conversationStore.setEmail(input.value)
  // isOpen2.value = false
}

const validateEmail = () => {
  if (!input.value) {
    error.value = 'Bitte gib eine E-Mail Adresse ein.'
    return
  }
  if (!input.value.includes('@')) {
    error.value = 'Bitte gib eine gültige E-Mail Adresse ein.'
    return
  }
  error.value = ''
}

</script>

<template>
  <div>
    <!-- todo: resolve client only workaround solving hydration issues for modal-->
    <ClientOnly>
      <UModal v-model="isOpen" prevent-close>
        <UCard>
          <template #header>
            <div class="">
              <h1 class="text-2xl">Pexon Consulting: ESG Chat-Bot </h1>
            </div>
          </template>
          <div class="flex flex-col gap-4">
            <p class="text-gray-500">Bitte gib deine E-Mail Adresse ein, um den Chat zu starten.</p>
            <UInput v-model="input" placeholder="E-Mail Adresse" />
            <UAlert
                v-if="error"
                :title="error"
                color="red"
                variant="subtle"
            />
            <UButton @click="startChat" color="primary" variant="solid">Chat starten</UButton>
          </div>
        </UCard>
      </UModal>
    </ClientOnly>
  </div>

</template>

<style scoped>

</style>