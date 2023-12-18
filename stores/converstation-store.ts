import type {Status} from "~/composables/usePrompt";
import type {ComputedGetter, ComputedRef} from "vue";

export type Prompt = {
    question: string,
    answer: ComputedRef<string | undefined>,
    submissionStatus: ComputedRef<Status>,
    // retry: () => void,
}

export const useConversationStore = defineStore('conversation', () => {

    const conversation = ref<Prompt[]>([
        {
            question: 'Hello',
            answer: computed(() => 'Hello'),
            submissionStatus: computed(() => ({
                error: null,
                pending: false,
                data: null,
                initial: true,
            })),
        },
        {
            question: 'How are you?',
            answer: computed(() => 'I am fine'),
            submissionStatus: computed(() => ({
                error: null,
                pending: false,
                data: null,
                initial: true,
            })),
        },
    ])


    // const pastUserMessages = computed(() => conversation.value.filter(message => message.owner === MessageOwner.User))
    // const pastBotMessages = computed(() => conversation.value.filter(message => message.owner === MessageOwner.Bot))
    // const requestBody = ref<PromptRequest>();

    function submitPrompt(question: string) {
        const prompt = usePrompt(question)
        console.log(prompt)
        conversation.value.push(prompt)
    }

    return { conversation, submitPrompt }
})