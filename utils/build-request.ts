import type {Conversation} from "~/stores/converstation-store";

export default function (question: string, { email, session, conversation}: Conversation) {
    return  {
        question: question,
        chat_history: conversation.map(prompt => ({
            inputs: { question: prompt.question },
            outputs: { answer: prompt.answer.value },

        })),
        // for testing: triggering error
        // chat_history: {},
        email:  email,
        session: session,
    }
}