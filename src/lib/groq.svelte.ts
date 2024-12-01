import { PUBLIC_GROQ_API_KEY } from '$env/static/public';
import Groq from 'groq-sdk';

interface Message {
	role: 'assistant' | 'user';
	content: string | null;
}
let messages: Message[] = $state([]);

const groqClient = new Groq({
	apiKey: PUBLIC_GROQ_API_KEY,
	dangerouslyAllowBrowser: true
});

async function askGroq(query: string): Promise<void> {
	messages.push({ role: 'user', content: query });
	messages.push(
		(
			await groqClient.chat.completions.create({
				messages: [
					{ role: 'system', content: 'Keep the answers concise, but be polite.' },
					// @ts-ignore
					...messages
				],
				model: 'llama-3.2-90b-vision-preview'
			})
		).choices.slice(-1)[0].message
	);
}

export const groq: { ask: Function; messages: Message[] } = {
	ask: askGroq,
	messages
};
