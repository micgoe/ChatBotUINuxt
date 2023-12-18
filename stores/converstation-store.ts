import type {Status} from "~/composables/usePrompt";
import type {ComputedGetter, ComputedRef} from "vue";
import {usePrompt} from "~/composables/usePrompt";

export type Prompt = {
    question: string,
    answer: ComputedRef<string | undefined>,
    submissionStatus: ComputedRef<Status>,
    // retry: () => void,
}

export const useConversationStore = defineStore('conversation', () => {

    const conversation = ref<Prompt[]>([
    ])

    const hasNotStarted = computed(() => conversation.value.length === 0)

    // const pastUserMessages = computed(() => conversation.value.filter(message => message.owner === MessageOwner.User))
    // const pastBotMessages = computed(() => conversation.value.filter(message => message.owner === MessageOwner.Bot))
    // const requestBody = ref<PromptRequest>();

    function submitPrompt(question: string) {
        const prompt = () => usePrompt(question)
        conversation.value.push(prompt())
    }

    return { conversation, submitPrompt, hasNotStarted }
})