export default  defineEventHandler(async (event) => {

    console.log('/promt requested')
    const body = await readBody(event)
    console.log("body")
    console.log(body)


    const repo = await $fetch('http://20.93.202.86/score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Accept': "text/event-stream",
        },
        body: JSON.stringify(body),

    })

    return repo
})