<script lang="ts" context="module">
	export interface Feature {
		label: string;
		prefix?: string;
	}
	export interface Clue {
		features: [Feature] | [Feature, Feature];
		status: boolean;
	}
	interface ClueGroup {
		prefix: string;
		values: Clue[];
	}
	export interface PossibleClues {
		on_terrain: ClueGroup;
		near_terrain_or_animal: ClueGroup;
		near_animal_or_feature: ClueGroup;
		near_feature: ClueGroup;
	}
	export interface Player {
		name: string;
		clues: PossibleClues;
	}
</script>

<script lang="ts">
	import AddPlayer from './AddPlayer.svelte';
	import Clues from './Clues.svelte';

	const savedData = localStorage.getItem('data');
	let players: Player[] = savedData ? JSON.parse(savedData) : [];
	$: {
		localStorage.setItem('data', JSON.stringify(players));
	}

	let activePlayer = 0;
	$: clues = players.length > 0 ? players[activePlayer].clues : null;

	const refresh = () => (players = players);
</script>

<AddPlayer bind:players />

<div class="flex gap-x-2">
	{#each players as player, index}
		<label>
			{player.name}
			<input type="radio" name="player" bind:group={activePlayer} value={index} class="underline" />
		</label>
	{/each}
</div>

<div class="w-full flex flex-col md:items-center">
	{#if clues}
		<Clues {clues} {refresh} />
	{/if}
</div>
