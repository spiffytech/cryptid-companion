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

  return (
    <div
      class={`${
        players[activePlayer()]?.color.replace(/^text/, "bg") ??
        "bg-emerald-500"
      } min-h-100 min-w-100 p-1`}
    >
      <div
        class={`m-4 p-2 ${
          players[activePlayer()]?.color
            .replace(/^text/, "bg")
            .replace(/\d+$/, "50") ?? "bg-emerald-50"
        } rounded-lg flex flex-col items-center`}
      >
        <h1 class="text-4xl font-semibold comic-neue mx-auto">
          Cryptid Companion
        </h1>

        <Show when={players.length === 0}>
          <AddPlayer addPlayer={(player) => setPlayers([...players, player])} />
        </Show>

        <div class="flex flex-col items-center">
          <div class="flex gap-x-8">
            <For each={players}>
              {(player, index) => (
                <label class="pb-1">
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
        </div>

        <Show when={clues()}>
          <hr
            class={`rounded-full border-t-4 w-3/5 lg:w-2/5 mb-4
                  ${players[activePlayer()].color.replace(/^text/, "border")}
          `}
          />
        </Show>

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
          </Show>{" "}
        </div>

        <Show when={players.length > 0}>
          <button
            type="button"
            onclick={() => setPlayers([])}
            class="block mx-auto mt-8 px-2 py-1 border-2 rounded-md"
          >
            Start a new game
          </button>
        </Show>
      </div>
    </div>
  );
};
export default App;
