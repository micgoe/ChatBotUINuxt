import type {Conversation} from "~/stores/converstation-store";

export default function (question: string, { email, session, conversation}: Conversation) {
    return  {
        question: question,
        chat_history: conversation.map(prompt => ({
            inputs: { question: prompt.question },
            outputs: { answer: prompt.answer.value },

        })),
        email:  email,
        session: session,
    }
}