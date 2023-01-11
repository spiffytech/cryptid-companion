import { spawnSync } from 'child_process';

export default () => {
	const result = spawnSync('date');
	return result.stdout.toString();
};
