import { createSignal, For, Show } from "solid-js";
import type { Component } from "solid-js";

import ColorIcon from "./ColorIcon";
import { availableColors } from "../lib/stuff";

import type { Player, PossibleClues } from "../App";
import type { PlayerColors } from "../lib/stuff";

const AddPlayer: Component<{ addPlayer: (player: Player) => void }> = (
  props
) => {
  const addPlayer = (color: PlayerColors) => {
    const clues: PossibleClues = {
      on_terrain: {
        prefix: "On",
        values: [
          {
            features: [{ label: "forest" }, { label: "desert" }],
            status: false,
          },
          {
            features: [{ label: "forest" }, { label: "water" }],
            status: false,
          },
          {
            features: [{ label: "forest" }, { label: "swamp" }],
            status: false,
          },
          {
            features: [{ label: "forest" }, { label: "mountain" }],
            status: false,
          },
          {
            features: [{ label: "desert" }, { label: "water" }],
            status: false,
          },
          {
            features: [{ label: "desert" }, { label: "swamp" }],
            status: false,
          },
          {
            features: [{ label: "desert" }, { label: "mountain" }],
            status: false,
          },
          { features: [{ label: "water" }, { label: "swamp" }], status: false },
          {
            features: [{ label: "water" }, { label: "mountain" }],
            status: false,
          },
          {
            features: [{ label: "swamp" }, { label: "mountain" }],
            status: false,
          },
        ],
      },
      near_terrain_or_animal: {
        prefix: "Within one space of",
        values: [
          { features: [{ label: "forest" }], status: false },
          { features: [{ label: "desert" }], status: false },
          { features: [{ label: "swamp" }], status: false },
          { features: [{ label: "mountain" }], status: false },
          { features: [{ label: "water" }], status: false },
          { features: [{ label: "either animal territory" }], status: false },
        ],
      },
      near_animal_or_feature: {
        prefix: "Within two spaces of",
        values: [
          {
            features: [{ prefix: "a", label: "standing stone" }],
            status: false,
          },
          {
            features: [{ prefix: "an", label: "abandoned shack" }],
            status: false,
          },
          { features: [{ label: "cougar territory" }], status: false },
          { features: [{ label: "bear territory" }], status: false },
        ],
      },
      near_feature: {
        prefix: "On",
        values: [
          {
            features: [{ prefix: "a", label: "blue structure" }],
            status: false,
          },
          {
            features: [{ prefix: "a", label: "white structure" }],
            status: false,
          },
          {
            features: [{ prefix: "a", label: "green structure" }],
            status: false,
          },
          {
            features: [{ prefix: "a", label: "black structure" }],
            status: false,
          },
        ],
      },
    };

    props.addPlayer({ color, clues });
  };

  const addPlayers = (e: Event) => {
    e.preventDefault();
    selectedColors().forEach((color) => addPlayer(color));
  };

  const [selectedColors, setSelectedColors] = createSignal<PlayerColors[]>([]);
  const toggleColor = (event: Event, color: PlayerColors) => {
    const checked = (event.target as HTMLInputElement).checked;
    if (!checked) {
      setSelectedColors(selectedColors().filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors(), color]);
    }
  };

  const submitDisabled = () => selectedColors().length < 3;

  return (
    <>
      <div class="flex gap-x-4 mt-4 mb-4">
        <For each={Object.values(availableColors) as PlayerColors[]}>
          {(color) => (
            <label>
              <ColorIcon
                color={color}
                checked={selectedColors().includes(color)}
              />
              <input
                type="checkbox"
                value={color}
                onchange={(e) => toggleColor(e, color)}
                name="players"
                class="hidden"
              />
            </label>
          )}
        </For>
      </div>

      <Show
        when={!submitDisabled()}
        fallback={
          <p class="italic text-sm">Click 3–5 colors to put them in the game</p>
        }
      >
        <button
          type="submit"
          onclick={addPlayers}
          class="block mx-auto px-2 py-1 border-2 rounded-md"
          classList={{ "text-gray-500": submitDisabled() }}
          disabled={submitDisabled()}
        >
          Select players
        </button>
      </Show>
    </>
  );
};
export default AddPlayer;
