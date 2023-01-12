import { createEffect, createMemo, createSignal, Show, For } from "solid-js";
import { createStore } from "solid-js/store";

import type { Component } from "solid-js";

import AddPlayer from "./components/AddPlayer";
import Clues from "./components/Clues";
import ColorIcon from "./components/ColorIcon";

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
  color: string;
  clues: PossibleClues;
}

const App: Component = () => {
  const savedData = localStorage.getItem("data");
  const [players, setPlayers] = createStore<Player[]>(
    savedData ? JSON.parse(savedData) : []
  );
  createEffect(() => localStorage.setItem("data", JSON.stringify(players)));

  const [activePlayer, setActivePlayer] = createSignal(0);
  const clues = createMemo(() =>
    players.length > 0 ? players[activePlayer()].clues : null
  );
  createEffect(() => console.log(clues()?.on_terrain.values[0].status));

  return (
    <>
      <div class="flex justify-between">
        <Show when={players.length === 0}>
          <AddPlayer addPlayer={(player) => setPlayers([...players, player])} />
        </Show>

        <button type="button" onclick={() => setPlayers([])} class="ml-auto">
          Reset
        </button>
      </div>

      <div class="flex gap-x-8 justify-center mb-4">
        <For each={players}>
          {(player, index) => (
            <label
              class="pb-1"
              classList={{
                [`border-b-4 ${player.color.replace(/^text/, "border")}`]:
                  activePlayer() === index(),
              }}
            >
              <ColorIcon color={player.color} checked={false} />
              <input
                type="radio"
                name="player"
                onchange={() => setActivePlayer(index())}
                value={index()}
                class="hidden"
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
              setPlayers(
                activePlayer(),
                "clues",
                group,
                "values",
                i,
                "status",
                (status) => !status
              )
            }
          />
        </Show>
      </div>
    </>
  );
};
export default App;
