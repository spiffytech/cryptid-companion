<script lang="ts">
	import clsx from 'clsx';

	import type { Clue, PossibleClues } from './+page.svelte';

	import Feature from './Feature.svelte';

	export let clues: PossibleClues;
	export let refresh: () => void;

	$: groups = [
		{
			header: 'On one of two types of terrain',
			...clues.on_terrain
		},
		{
			header: 'Within one space of a terrain type or animal territory',
			...clues.near_terrain_or_animal
		},
		{
			header: 'Within two spaces of a type of animal territory or a type of structure',
			...clues.near_animal_or_feature
		},
		{
			header: 'Within three spaces of a colour of structure',
			...clues.near_feature
		}
	];

	const toggleClue = (clue: Clue) => {
		clue.status = !clue.status;
		refresh();
	};
</script>

{#each groups as group}
	{@const subgroups = [
		group.values.slice(0, group.values.length / 2),
		group.values.slice(group.values.length / 2)
	]}
	<div class="md:w-4/5 lg:w-3/5 flex flex-col md:items-center ml-12">
		<h2 class="font-bold border-b-2 w-full md:text-center">{group.header}</h2>
		<div class="flex flex-wrap w-full justify-between mb-8">
			{#each subgroups as subgroup}
				<ul class="table">
					{#each subgroup as value}
						<li
							class={clsx(
								'table-row',
								value.status && 'line-through decoration-2 text-gray-400 grayscale'
							)}
						>
							<input
								type="checkbox"
								checked={value.status}
								on:change={() => toggleClue(value)}
								class="mr-2"
							/>
							<span class="table-cell">{group.prefix ?? ''}</span>
							<Feature features={value.features} />
						</li>
					{/each}
				</ul>
			{/each}
		</div>
	</div>
{/each}
