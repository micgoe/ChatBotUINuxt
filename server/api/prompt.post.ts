export default  defineEventHandler(async (event) => {

    setHeader(event, 'Content-Type', 'text/event-stream')
    setHeader(event, 'Cache-Control', 'no-cache')
    setHeader(event, 'Connection', 'keep-alive')
    setResponseStatus(event, 200)

    console.log('/promt requested')
    const body = await readBody(event)
    console.log("body")
    console.log(body)


    const response =  await fetch('http://20.93.202.86/score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "text/event-stream",
        },
        body: JSON.stringify(body),
    })

    if (!response.body) return;
    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
    while (true) {
        const { done, value } = await reader.read()
        if (done) break;
        console.log(value)
        event.node.res.write(value)
    }
})