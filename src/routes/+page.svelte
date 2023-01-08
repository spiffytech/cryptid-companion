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
		console.log('foo');
		localStorage.setItem('data', JSON.stringify(players));
	}

	const refresh = () => (players = players);
</script>

<AddPlayer bind:players />

<ul class="flex gap-x-2">
	{#each players as player}
		<li class="underline">{player.name}</li>
	{/each}
</ul>

<div class="w-full flex flex-col md:items-center">
	{#if players.length > 0}
		<Clues clues={players[0].clues} {refresh} />
	{/if}
</div>
