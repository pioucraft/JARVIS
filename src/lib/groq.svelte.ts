import { PUBLIC_GROQ_API_KEY } from '$env/static/public';
import Groq from 'groq-sdk';
import type { Message } from './interfaces';

const groqClient = new Groq({
	apiKey: PUBLIC_GROQ_API_KEY,
	dangerouslyAllowBrowser: true
});

async function askGroq(messages: Message[] | undefined): Promise<Message> {
	return (
		await groqClient.chat.completions.create({
			// @ts-ignore
			messages,
			model: 'llama-3.2-90b-vision-preview'
		})
	).choices.slice(-1)[0].message;
}

export const groq: { ask: Function } = {
	ask: askGroq
};
