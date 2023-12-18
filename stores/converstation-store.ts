
export enum MessageOwner {
    User,
    Bot
}

export type Message  = {
    owner: MessageOwner,
    message: string
}

type State = {
    pending: boolean,
    error: boolean,
}

type PromptRequest = {
    question: string,
    chat_history?: {
        inputs: string[],
        outputs: string[],
    }
}

type PromptResponse = {
    answer: string,
}



export const useConversationStore = defineStore('conversation', () => {

    const conversation = ref<Message[]>([
        { owner: MessageOwner.User, message: 'Hello, how are you?' }
    ])

    const activeMessage = ref<string | undefined>(undefined)
    const pastUserMessages = computed(() => conversation.value.filter(message => message.owner === MessageOwner.User))
    const pastBotMessages = computed(() => conversation.value.filter(message => message.owner === MessageOwner.Bot))
    const requestBody = ref<PromptRequest>();

    const _buildRequest = () => {
        if (!activeMessage.value) {
            console.warn('No active message to submit')
            return
        }
        return  {
            question: activeMessage.value
            // chat_history: {
            //     inputs: pastUserMessages.value.map(m => m.message),
            //     outputs: pastBotMessages.value.map(m => m.message)
            // }
        }
    }


    const { error, pending, data, execute, status } = useFetch<PromptResponse>('/api/prompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody,
        immediate: false,
        server: false,
    })

    watch(data, (data) => {
        if (data) {
            conversation.value = [
                ...conversation.value,
                // todo: correct behaviour when activeMessage is undefined
                { owner: MessageOwner.User, message: activeMessage.value? activeMessage.value : '' },
                { owner: MessageOwner.Bot, message: data.answer }
            ]
        }
        activeMessage.value = undefined
    })


    const submissionStatus = computed(() => ({
        error: error.value,
        pending: pending.value,
        data: data.value,
        inital: status.value === 'idle',
    }))

    const submitPrompt = () => {
        const request = _buildRequest()
        if (!request) {
            return
        }
        requestBody.value = request
    }

    return { conversation, activeMessage, submissionStatus, submitPrompt }
})