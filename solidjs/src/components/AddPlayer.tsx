import type { Player, PossibleClues } from '../routes/index';

const AddPlayer = ({ addPlayer }: { addPlayer: (player: Player) => void }) => {
	const createPlayer = () => {
		const clues: PossibleClues = {
			on_terrain: {
				prefix: 'On',
				values: [
					{ features: [{ label: 'forest' }, { label: 'desert' }], status: false },
					{ features: [{ label: 'forest' }, { label: 'water' }], status: false },
					{ features: [{ label: 'forest' }, { label: 'swamp' }], status: false },
					{ features: [{ label: 'forest' }, { label: 'mountain' }], status: false },
					{ features: [{ label: 'desert' }, { label: 'water' }], status: false },
					{ features: [{ label: 'desert' }, { label: 'swamp' }], status: false },
					{ features: [{ label: 'desert' }, { label: 'mountain' }], status: false },
					{ features: [{ label: 'water' }, { label: 'swamp' }], status: false },
					{ features: [{ label: 'water' }, { label: 'mountain' }], status: false },
					{ features: [{ label: 'swamp' }, { label: 'mountain' }], status: false }
				]
			},
			near_terrain_or_animal: {
				prefix: 'Within one space of',
				values: [
					{ features: [{ label: 'forest' }], status: false },
					{ features: [{ label: 'desert' }], status: false },
					{ features: [{ label: 'swamp' }], status: false },
					{ features: [{ label: 'mountain' }], status: false },
					{ features: [{ label: 'water' }], status: false },
					{ features: [{ label: 'either animal territory' }], status: false }
				]
			},
			near_animal_or_feature: {
				prefix: 'Within two spaces of',
				values: [
					{ features: [{ prefix: 'a', label: 'standing stone' }], status: false },
					{ features: [{ prefix: 'an', label: 'abandoned shack' }], status: false },
					{ features: [{ label: 'cougar territory' }], status: false },
					{ features: [{ label: 'bear territory' }], status: false }
				]
			},
			near_feature: {
				prefix: 'On',
				values: [
					{ features: [{ prefix: 'a', label: 'blue structure' }], status: false },
					{ features: [{ prefix: 'a', label: 'white structure' }], status: false },
					{ features: [{ prefix: 'a', label: 'green structure' }], status: false },
					{ features: [{ prefix: 'a', label: 'black structure' }], status: false }
				]
			}
		};

		addPlayer({ name: 'foo', clues });
	};

	return (
		<button type="button" onclick={createPlayer}>
			Add a player!
		</button>
	);
};
export default AddPlayer;
