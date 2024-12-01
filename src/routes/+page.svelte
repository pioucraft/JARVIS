<script lang="ts">
	import { groq } from '$lib/groq.svelte';

	let question: string | undefined;

	function askGroq(): void {
		if (!question) return;
		groq.ask(question);
		question = '';
	}
</script>

<p>{JSON.stringify(groq.messages)}</p>
<input type="text" on:change={askGroq} bind:value={question} />
