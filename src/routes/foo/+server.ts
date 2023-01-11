export const GET = (...stuff: any[]) => {
	console.log(stuff);
	return new Response('foo');
};
