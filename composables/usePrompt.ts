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

export type Status = {
    error: any,
    pending: boolean,
    data: any,
    initial: boolean,
}

export const usePrompt = (question: string) => {
    const requestBody = buildRequest(question)

    const { error, pending, data, status } = useFetch<PromptResponse>('/api/prompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody,
        immediate: true,
        server: false,
        // use time-stamp prevent cache of the request
        key: new Date().getTime().toString()
    })

    const answer = computed(() => data.value?.answer)

    const submissionStatus = computed(() => ({
        error: error.value,
        pending: pending.value,
        data: data.value,
        inital: status.value === 'idle',
    }));

    const retry = () => {

    }

    const abord = () => {

    }

    return {
        submissionStatus,
        question,
        answer,
    }
}