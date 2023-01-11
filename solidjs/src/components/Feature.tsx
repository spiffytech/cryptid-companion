import 'bootstrap-icons/font/bootstrap-icons.css';

import clsx from 'clsx';
import { For } from 'solid-js';

import type { Feature } from '../routes/index';

const FeatureComponent = (props: { features: Feature[] }) => {
	const selectIcon = (label: string): { icon: string; color: string }[] => {
		switch (label) {
			case 'forest':
				return [{ icon: 'circle-fill', color: 'text-green-700' }];
			case 'desert':
				return [{ icon: 'circle-fill', color: 'text-yellow-500' }];
			case 'water':
				return [{ icon: 'circle-fill', color: 'text-blue-400' }];
			case 'swamp':
				return [{ icon: 'circle-fill', color: 'text-purple-700' }];
			case 'mountain':
				return [{ icon: 'circle-fill', color: 'text-gray-400' }];
			case 'either animal territory':
				return [
					{ icon: 'hexagon', color: 'text-red-500' },
					{ icon: 'hexagon', color: 'text-gray-700' }
				];
			case 'standing stone':
				return [{ icon: 'hexagon-fill', color: 'text-gray-900' }];
			case 'abandoned shack':
				return [{ icon: 'triangle-fill', color: 'text-gray-900' }];
			case 'cougar territory':
				return [{ icon: 'hexagon', color: 'text-red-500' }];
			case 'bear territory':
				return [{ icon: 'hexagon', color: 'text-gray-900' }];
			case 'blue structure':
				return [
					{ icon: 'hexagon-fill', color: 'text-blue-700' },
					{ icon: 'triangle-fill', color: 'text-blue-700' }
				];
			case 'white structure':
				return [
					{ icon: 'hexagon-fill', color: 'text-gray-300' },
					{ icon: 'triangle-fill', color: 'text-gray-300' }
				];
			case 'green structure':
				return [
					{ icon: 'hexagon-fill', color: 'text-green-700' },
					{ icon: 'triangle-fill', color: 'text-green-700' }
				];
			case 'black structure':
				return [
					{ icon: 'hexagon-fill', color: 'text-gray-700' },
					{ icon: 'triangle-fill', color: 'text-gray-700' }
				];

			default:
				throw new Error("A feature style wasn't specified");
		}
	};

	return (
		<For each={props.features}>
			{(feature, index) => (
				<span class="table-cell">
					<span class="ml-1">{feature.prefix ?? ''}</span>
					<span class="ml-1">
						<For each={selectIcon(feature.label)}>
							{(icon, index) => (
								<i
									v-for="(icon, index) in selectIcon(feature.label)"
									class={clsx(
										`bi-${icon.icon}`,
										icon.color,
										index() + 1 < selectIcon(feature.label).length && 'mr-1'
									)}
								/>
							)}
						</For>
					</span>
					{feature.label}
					{index() + 1 < props.features.length ? ' or ' : ''}
				</span>
			)}
		</For>
	);
};

export default FeatureComponent;
