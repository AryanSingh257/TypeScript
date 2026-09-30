// Central place to read environment variables.
// Vite prefixes client-exposed vars with VITE_ and inlines them at build
// time, so they are safe to use in browser code.
//
// NEVER put secrets here that should stay server-only. For truly secret
// values (database passwords, private keys, etc.) use SvelteKit server
// endpoints (`src/routes/api/+server.js`) and access them with
// `import { env } from '$env/dynamic/private'` — those never reach the
// client bundle.

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string | undefined;

if (!API_KEY) {
	// Fail fast in dev so you notice a missing key instead of getting a
	// runtime error from the API.
	throw new Error(
		'Missing VITE_WEATHER_API_KEY. Copy .env.example to .env and add your Visual Crossing API key.'
	);
}

export const WEATHER_API_KEY = API_KEY;