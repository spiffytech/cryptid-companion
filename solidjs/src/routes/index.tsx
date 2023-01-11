import { createEffect, onMount, createMemo, createSignal, For, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import { createServerAction$, createServerData$ } from 'solid-start/server';
import { useRouteData } from 'solid-start';

import AddPlayer from '~/components/AddPlayer.js';
import Clues from '~/components/Clues.js';

export interface Feature {
	label: string;
	prefix?: string;
}
export interface Clue {
	features: [Feature] | [Feature, Feature];
	status: boolean;
}
export interface ClueGroup {
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

export const routeData = () => {
	return createServerData$(() => new Date());
};

const App = () => {
	const [fooR, foo] = createServerAction$(async () => ({ f: new Date() }));
	createEffect(() => console.log(fooR.result));
	onMount(() => foo());

	const data = useRouteData();

	const [players, setPlayers] = createStore<Player[]>([]);
	onMount(() => {
		const savedData = localStorage.getItem('data');
		if (!savedData) return;
		setPlayers(JSON.parse(savedData));
	});
	createEffect(() => localStorage.setItem('data', JSON.stringify(players)));

	const [activePlayer, setActivePlayer] = createSignal(0);

	const clues = createMemo(() => (players.length > 0 ? players[activePlayer()].clues : null));

	const addPlayer = (player: Player) => {
		setPlayers([...players, player]);
	};

	return (
		<>
			<AddPlayer addPlayer={addPlayer} />

			<div class="flex gap-x-2">
				<p>Active player: {activePlayer()}</p>
				<For each={players}>
					{(player, index) => (
						<label>
							{player.name}
							<input
								type="radio"
								name="player"
								onchange={() => setActivePlayer(index())}
								value={index()}
								class="underline"
							/>
						</label>
					)}
				</For>
			</div>

			<div class="w-full flex flex-col md:items-center">
				<Show when={clues()}>
					<Clues
						clues={clues()!}
						toggleClue={(group: keyof PossibleClues, i: number) =>
							setPlayers(activePlayer(), 'clues', group, 'values', i, 'status', (status) => !status)
						}
					/>
				</Show>
			</div>
		</>
	);
};
export default App;
