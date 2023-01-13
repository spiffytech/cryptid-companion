import { createMemo, For } from "solid-js";

import type { Component } from "solid-js";

import Feature from "./Feature";

import type { PossibleClues } from "../App";

const Clues: Component<{
  clues: PossibleClues;
  toggleClue: (group: keyof PossibleClues, i: number) => void;
}> = (props) => {
  const groups = createMemo(() => [
    {
      header: "On one of two types of terrain",
      ...props.clues.on_terrain,
      group: "on_terrain" as keyof PossibleClues,
    },
    {
      header: "Within one space of a terrain type or animal territory",
      ...props.clues.near_terrain_or_animal,
      group: "near_terrain_or_animal" as keyof PossibleClues,
    },
    {
      header:
        "Within two spaces of a type of animal territory or a type of structure",
      ...props.clues.near_animal_or_feature,
      group: "near_animal_or_feature" as keyof PossibleClues,
    },
    {
      header: "Within three spaces of a colour of structure",
      ...props.clues.near_feature,
      group: "near_feature" as keyof PossibleClues,
    },
  ]);

  const subgroups = (group: ReturnType<typeof groups>[number]) => [
    group.values.slice(0, group.values.length / 2),
    group.values.slice(group.values.length / 2),
  ];

  return (
    <For each={groups()}>
      {(group) => (
        <div class="md:w-4/5 lg:w-3/5 flex flex-col md:items-center px-4">
          <h2 class="text-lg font-semibold border-b-2 w-full md:text-center comic-neue">
            {group.header}
          </h2>
          <div class="flex flex-wrap w-full justify-between mb-8">
            <For each={subgroups(group)}>
              {(subgroup, subgroupIndex) => (
                <ul>
                  <For each={subgroup}>
                    {(value, index) => (
                      <li>
                        <label class="flex">
                          <input
                            type="checkbox"
                            checked={value.status}
                            onchange={() =>
                              props.toggleClue(
                                group.group,
                                index() +
                                  (subgroupIndex() > 0 ? subgroup.length : 0)
                              )
                            }
                            class="mr-2"
                          />
                          {/* CSS text-decoration strikethrough breaks up anytime it encounters
          margin or padding. So we have to hack around it with a positioned
          border instead :(  */}
                          <span
                            class="flex"
                            classList={{
                              "strikethrough text-gray-400 grayscale-[80%]":
                                value.status,
                            }}
                          >
                            <span>{group.prefix ?? ""}</span>
                            <Feature features={value.features} />
                          </span>
                        </label>
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
