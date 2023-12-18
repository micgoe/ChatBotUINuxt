import type {Status} from "~/composables/usePrompt";
import type {ComputedGetter, ComputedRef} from "vue";
import {usePrompt} from "~/composables/usePrompt";
import { v4 as uuidv4 } from 'uuid';

export type Prompt = {
    question: string,
    answer: Ref<string>,
    submissionStatus: ComputedRef<Status>,
    // retry: () => void,
}

export type Conversation = {
    conversation: Prompt[],
    email: string,
    session: string,
}

export const useConversationStore = defineStore('conversation', () => {
    const email = ref<string | undefined>("test")
    const session = ref<string | undefined>(undefined)


    function createConversation() {
        conversation.value = []
        session.value = uuidv4()
    }

    function setEmail(value: string) {
        email.value = value
    }

    const conversation = ref<Prompt[]>([])

    const hasNotStarted = computed(() => conversation.value.length === 0)

    const isBlocked = computed(() => conversation.value.some(prompt => prompt.submissionStatus.pending))

    function submitPrompt(question: string) {
        const prompt = usePrompt(question, { conversation: conversation.value, email: email.value, session: session.value })
        conversation.value.push(prompt)
    }

    function resetConversation() {
        createConversation()
    }

    createConversation()
    return { conversation, email, session,isBlocked, submitPrompt, setEmail, hasNotStarted, resetConversation }
})