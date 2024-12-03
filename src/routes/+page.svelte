<script lang="ts">
	import { groq } from '$lib/groq.svelte';
	import type { Message } from '$lib/interfaces';

	let messages: Message[] = $state([]);
	let question: string | undefined = $state('');

	async function askGroq(): Promise<void> {
		if (!question) return;
		messages.push({ role: 'user', content: question });
		question = '';
		console.log(
			await groq.ask(
				messages.map((message, index) => {
					if (index == messages.length - 1) {
						return {
							content: `Answer to the user question using a plan that you can follow in order to answer its question. the plan could be only : "1. answer the question using natural language", or it could be "1. search on the web 2. Answer the question in natural language". Make sure that you always finish the plan with an answer in natural language. Also make sure that the only things that you are able to do are : answer in natural language, search on the web, search for a stock. THESE ARE THE ONLY STEPS YOU CAN TAKE TO ANSWER THE USER'S QUESTION. Only answer with the steps to take in order to answer the question. DO NOT PERFORM THOSE STEPS ! Here's the question : ${message.content}`,
							role: 'user'
						};
					}
					return message;
				})
			)
		);
		messages.push(await groq.ask(messages));
	}
</script>

{#each messages as message}
	<p>{message.content}</p>
{/each}
<input type="text" onchange={askGroq} bind:value={question} />
