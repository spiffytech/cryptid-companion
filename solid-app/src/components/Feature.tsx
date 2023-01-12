import { createSignal, onMount, For } from "solid-js";

import type { Component } from "solid-js";

import type { Feature } from "../App";

const FeatureComponent: Component<{ features: Feature[] }> = (props) => {
  const selectIcon = (label: string): { icon: string; color: string }[] => {
    switch (label) {
      case "forest":
        return [{ icon: "circle-fill", color: "text-green-700" }];
      case "desert":
        return [{ icon: "circle-fill", color: "text-yellow-500" }];
      case "water":
        return [{ icon: "circle-fill", color: "text-blue-400" }];
      case "swamp":
        return [{ icon: "circle-fill", color: "text-purple-700" }];
      case "mountain":
        return [{ icon: "circle-fill", color: "text-gray-400" }];
      case "either animal territory":
        return [
          { icon: "hexagon", color: "text-red-500" },
          { icon: "hexagon", color: "text-gray-700" },
        ];
      case "standing stone":
        return [{ icon: "hexagon-fill", color: "text-gray-900" }];
      case "abandoned shack":
        return [{ icon: "triangle-fill", color: "text-gray-900" }];
      case "cougar territory":
        return [{ icon: "hexagon", color: "text-red-500" }];
      case "bear territory":
        return [{ icon: "hexagon", color: "text-gray-900" }];
      case "blue structure":
        return [
          { icon: "hexagon-fill", color: "text-blue-700" },
          { icon: "triangle-fill", color: "text-blue-700" },
        ];
      case "white structure":
        return [
          { icon: "hexagon-fill", color: "text-gray-300" },
          { icon: "triangle-fill", color: "text-gray-300" },
        ];
      case "green structure":
        return [
          { icon: "hexagon-fill", color: "text-green-700" },
          { icon: "triangle-fill", color: "text-green-700" },
        ];
      case "black structure":
        return [
          { icon: "hexagon-fill", color: "text-gray-700" },
          { icon: "triangle-fill", color: "text-gray-700" },
        ];

      default:
        throw new Error("A feature style wasn't specified");
    }
  };

  let el: HTMLDivElement | undefined;

  // There's no way to use CSS to align all the feature icons while also grouping
  // lines so we can uniformly style them. So hack around it by manually making
  // them as wide as they need to be.
  const [featureWidth, setFeatureWidth] = createSignal(0);
  onMount(() => {
    if (!el) return;
    const list = el.closest("ul")!;
    const features = list.querySelectorAll<HTMLSpanElement>(".feature-name");
    console.log(
      "l",
      Array.from(list.children).map((e) => e.children)
    );
    console.log({ list, features });
    console.log(Array.from(features).map((el) => el.offsetWidth));
    const maxWidth = Math.max(
      ...Array.from(features).map((el) => el.offsetWidth)
    );
    setFeatureWidth(maxWidth);
    console.log(featureWidth());
  });

  return (
    <div ref={el}>
      <For each={props.features}>
        {(feature, featureIndex) => (
          <span>
            <span class="ml-1">
              <For each={selectIcon(feature.label)}>
                {(icon, iconIndex) => (
                  <i
                    class={`bi-${icon.icon} ${icon.color}`}
                    classList={{
                      "mr-1":
                        iconIndex() + 1 < selectIcon(feature.label).length,
                    }}
                  />
                )}
              </For>
            </span>
            <span class="ml-1">{feature.prefix ?? ""}</span>
            <span
              style={{
                width:
                  featureIndex() + 1 < props.features.length
                    ? `${featureWidth()}px`
                    : "",
              }}
              class="inline-block whitespace-nowrap"
            >
              <span
                classList={{
                  "feature-name": featureIndex() === 0,
                }}
              >
                {feature.label}
                {featureIndex() + 1 < props.features.length ? " or " : ""}
              </span>
            </span>
          </span>
        )}
      </For>
    </div>
  );
};
export default FeatureComponent;
