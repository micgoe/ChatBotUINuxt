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
    const answer = ref<string>('')
    const error = ref<any>(undefined)
    const pending = ref<boolean>(false)


    // const { error, pending, data, status } = useFetch<PromptResponse>('/api/prompt', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: requestBody,
    //     immediate: false,
    //     server: false,
    //     // use time-stamp prevent cache of the request
    //     key: new Date().getTime().toString()
    // }

    pending.value = true
    fetch('/api/prompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "text/event-stream",
        },
        body: JSON.stringify(requestBody),
    }).then(async response => {
        if (!response.body) return;
        const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
        while (true) {
            const {done, value} = await reader.read()
            if (done) break;
            console.log("StreamReceived")
            const jsonString = value.split('\n').map(line => {
                if (line.startsWith('data:')) {
                    return `{${line.replace('data:', '"data":')}}`
                }
            }).filter(line => line !== undefined)
            const json = JSON.parse(`[${jsonString}]`)
            const answerChunk = json.map((chunk: any) => chunk.data.answer).join('')

            answer.value = answer.value + answerChunk
        }
        console.log("DONE")
        pending.value = false
    }).catch(error => {
        console.error(error)
        error.value = error
    })


    const submissionStatus = computed(() => ({
        error: error.value,
        pending: pending.value,
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