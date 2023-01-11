import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig, Plugin } from 'vite';
import { WebSocketServer } from 'ws';

const wss_: Plugin = {
	name: 'wss',
	configureServer(server) {
		if (!server.httpServer) return;
		console.log('foo');
		//console.log({ server });
		console.log(server.ws);
		//const wss = new WebSocketServer({ server: server.httpServer });
		//console.log('wss', wss);
	}
};

const config: UserConfig = {
	plugins: [wss_, sveltekit()]
};

export default config;
