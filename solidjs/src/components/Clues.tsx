import clsx from 'clsx';
import { createMemo, For } from 'solid-js';

import type { PossibleClues } from '../routes/index';

import Feature from './Feature.js';

const Clues = (props: {
	clues: PossibleClues;
	toggleClue: (group: keyof PossibleClues, i: number) => void;
}) => {
	const groups = createMemo(() => [
		{
			header: 'On one of two types of terrain',
			...props.clues.on_terrain,
			group: 'on_terrain' as const
		},
		{
			header: 'Within one space of a terrain type or animal territory',
			...props.clues.near_terrain_or_animal,
			group: 'near_terrain_or_animal' as const
		},
		{
			header: 'Within two spaces of a type of animal territory or a type of structure',
			...props.clues.near_animal_or_feature,
			group: 'near_animal_or_feature' as const
		},
		{
			header: 'Within three spaces of a colour of structure',
			...props.clues.near_feature,
			group: 'near_feature' as const
		}
	]);

	const subgroups = (group: ReturnType<typeof groups>[number]) => [
		group.values.slice(0, group.values.length / 2),
		group.values.slice(group.values.length / 2)
	];

	return (
		<For each={groups()}>
			{(group) => (
				<div v-for="group in groups" class="md:w-4/5 lg:w-3/5 flex flex-col md:items-center ml-12">
					<h2 class="font-bold border-b-2 w-full md:text-center">{group.header}</h2>
					<div class="flex flex-wrap w-full justify-between mb-8">
						<For each={subgroups(group)}>
							{(subgroup) => (
								<ul class="table">
									<For each={subgroup}>
										{(value, index) => (
											<li
												v-for="value in subgroup"
												class={clsx(
													'table-row',
													value.status && 'line-through decoration-2 text-gray-400 grayscale'
												)}
											>
												<input
													type="checkbox"
													checked={value.status}
													onchange={() => props.toggleClue(group.group, index())}
													class="mr-2"
												/>
												<span class="table-cell">{group.prefix ?? ''}</span>
												<Feature features={value.features} />
											</li>
										)}
									</For>
								</ul>
							)}
						</For>
					</div>
				</div>
			)}
		</For>
	);
};
export default Clues;
