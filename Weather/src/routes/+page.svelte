
<script lang="ts">
	import { onMount } from "svelte";
	import { WEATHER_API_KEY } from "$lib/env";

	import * as card from "$lib/components/ui/card/index";
	import { ArrowUp, Droplet, EyeDashed, CircleAlert } from "@lucide/svelte/icons";
	import Button from "$lib/components/ui/button/button.svelte";
	import Progress from "$lib/components/ui/progress/progress.svelte";
	import { motion } from "@humanspeak/svelte-motion";

	import WeatherIcon from "./WeatherIcon.svelte";
	import LocationPopOver from "./LocationPopOver.svelte";
    import Tabs from "./Tabs.svelte";

	type Location = {
		city: string;
		state: string;
		country: string;
	};

	let location = $state<Location>({
		city: "Hyderabad",
		state: "TS",
		country: "IN"
	});

	// Separate editable inputs from the location currently being displayed.
	// Keep this mutable (for `bind:`) but sync it whenever the displayed
	// `location` changes, so the form always reflects the latest location.
	let searchLocation = $state<Location>({ city: "", state: "", country: "" });
	$effect(() => {
		searchLocation = { ...location };
	});
	let locationOpen = $state(false);

	let weather = $state<any>(null);
	let loading = $state(true);
	let error = $state("");
	let searching = $state(false);

	const API_KEY = WEATHER_API_KEY;

	type Co_ords = {
		latitude: number,
		longitude: number
	}

	function getUserLocation(): Promise<Co_ords>{
		return new Promise((resolve,reject)=>{
			if(!navigator.geolocation) {
				reject(new Error("Geolocation is not supported in your browser."));
				return;
			}
	
			navigator.geolocation.getCurrentPosition(
				position => {
					const coords = {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					};

					localStorage.setItem("coords",JSON.stringify(coords));
					resolve(coords)
				},
				error => {
					if (error.code === error.PERMISSION_DENIED) {
						reject(new Error("Location permission was denied."));
					} else if (error.code === error.POSITION_UNAVAILABLE) {
						reject(new Error("Your device could not determine your location."));
					} else if (error.code === error.TIMEOUT) {
						reject(new Error("Location request timed out."));
					} else {
						reject(new Error("Unable to determine your location."));
					}
				}
			);
		})
	}

	async function fetchUserLocation() {
		searching = true;
		error = "";

		try {
			const savedCoords = localStorage.getItem("coords");
			let coords: Co_ords;

			if(savedCoords){
				coords = JSON.parse(savedCoords);
			}else{
				coords = await getUserLocation();
			}

			const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/$${coords.latitude},${coords.longitude}?unitGroup=metric&key=${API_KEY}&contentType=json`;

			const response = await fetch(url);
			console.log(response)

			if (!response.ok) {
				throw new Error(`Unable to retrieve weather (HTTP ${response.status})`);
			}

			weather = await response.json();;
			locationOpen = false;
		} catch (err) {
			error = err instanceof Error ? err.message : String(err);
		} finally {
			loading = false;
			searching = false;
		}
	}

	async function fetchWeather(target: Location) {
		searching = true;
		error = "";

		try {
			const place = [
				target.city.trim(),
				target.state.trim(),
				target.country.trim()
			]
			.filter(Boolean)
			.join(", ");
			
			const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/$${encodeURIComponent(place)}?unitGroup=metric&key=${API_KEY}&contentType=json`;

			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`Unable to retrieve weather (HTTP ${response.status})`);
			}

			weather = await response.json();;

			location = { ...target };
			locationOpen = false;
		} catch (err) {
			error = err instanceof Error ? err.message : String(err);
		} finally {
			loading = false;
			searching = false;
		}
	}

	onMount(() => {
		fetchWeather(location);
	});

	function submitLocation() {
		if (!searchLocation.city.trim()) {
			error = "Please enter a city.";
			return;
		}
		
		fetchWeather(searchLocation);
	}
	
	let current = $derived(weather?.currentConditions);
	let address = $derived(weather?.resolvedAddress);
	let daily = $derived(weather?.days ?? []);
	let today = $derived(daily[0]);
	let hourly = $derived(today?.hours ?? []);

	let hourlyData = $derived(
		hourly.map((hour: any) => ({
			dateTime: hour.datetime.slice(0, 5),
			temp: hour.temp,
			feelsLike: hour.feelslike,
			windDir: hour.winddir,
			windGust: hour.windgust,
			windSpeed: hour.windspeed
		}))
	);

	let dailyData = $derived(
		daily.map((day: any) => ({
			dateTime: day.datetime.slice(5, 10),
			minTemp: day.tempmin,
			maxTemp: day.tempmax,
			feelsLike: day.feelslike,
			icon: day.icon,
			windDir: day.winddir,
			windGust: day.windgust,
			windSpeed: day.windspeed
		}))
	);

	let precipitation = $state(0);
	$effect(()=>{
		precipitation = current.precipprob ?? 0;
	})

	// Recalculate sunrise/sunset progress whenever weather changes.
	let sunProgress = $derived.by(() => {
		if (!current?.datetime || !current?.sunrise || !current?.sunset) {
			return 0;
		}

		const now = reduceToSeconds(current.datetime);
		const sunrise = reduceToSeconds(current.sunrise);
		const sunset = reduceToSeconds(current.sunset);

		return Math.max(
			0,
			Math.min(100, ((now - sunrise) / (sunset - sunrise)) * 100)
		);
	});

	let sun=$state(0);

	let progressAnimation = setInterval(()=>{
		sun++;
		if(sun===sunProgress){
			clearInterval(progressAnimation);
		}
	},20)

	 let animatedTemp = $state(0);

	$effect(() => {
		const target = Math.round(current?.temp ?? 0);
		const start = animatedTemp;
		const duration = 600;
		const startTime = performance.now();

		let frame: number;

		function update(time: number) {
		const progress = Math.min((time - startTime) / duration, 1);

		// ease-out
		const eased = 1 - Math.pow(1 - progress, 3);

		animatedTemp = Math.round(
			start + (target - start) * eased
		);

		if (progress < 1) {
			frame = requestAnimationFrame(update);
		}
		}

		frame = requestAnimationFrame(update);

		return () => cancelAnimationFrame(frame);
	});

	function reduceToSeconds(time: string): number {
		const [hours, minutes, seconds = 0] = time.split(":").map(Number);
		return hours * 3600 + minutes * 60 + seconds;
	}
</script>

<main class="mx-auto flex min-h-dvh w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">

	<div class="flex flex-wrap items-center justify-between gap-3">
		<h1 class="shimmer text-xl font-bold sm:text-2xl">Weather</h1>

		
		<LocationPopOver 
		locationOpen={locationOpen}
		location={address}
		searchLocation={searchLocation}
		submitLocation={submitLocation}
		fetchUserLocation={fetchUserLocation}
		searching={searching}
		/>

</div>

{#if loading}
		<div class="flex min-h-[50dvh] items-center justify-center">
			<h2 class="shimmer text-xl font-semibold sm:text-3xl">
				Loading weather...
			</h2>
		</div>

	{:else if error && !weather}
		<div class="flex min-h-[40dvh] flex-col items-center justify-center gap-3 text-center">
			<CircleAlert class="h-10 w-10" />
			<h2 class="shimmer text-lg font-semibold">{error}</h2>
			<Button onclick={() => fetchWeather(location)}>Try Again</Button>
		</div>

	{:else if current}
		{#if error}
			<div class="rounded-lg border border-red-300 p-3 text-sm text-red-700" role="alert">
				{error}
			</div>
		{/if}

		<motion.section
		initial={{opacity: 0, y: 15}}
		animate={{opacity: 1, y: 0}}
		transition={{duration: 0.4}}
		class="flex flex-col items-center justify-center gap-2 py-6 text-center sm:py-10"
		>
			<WeatherIcon icon={current.icon} class="w-20 h-20" />

			<h2 class="text-xl font-semibold sm:text-2xl">
				{current.conditions}
			</h2>
			
			<h1 class="text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
				{animatedTemp}°C
			</h1>

			<p class="text-base font-medium sm:text-xl">
				Feels Like {Math.round(current.feelslike)}°
			</p>
		</motion.section>

		<motion.div
		initial={{opacity: 0, y: 25}}
		whileInView={{opacity: 1, y: 0}}
		viewport={{once: true, amount: 0.2}}
		transition={{duration: 0.6}}
		>
				<card.Root class="w-full min-w-0">
					<card.Header>
					<card.Title>Today's Forecast</card.Title>
				</card.Header>

				<card.Content class="min-w-0">
					<Tabs data={hourlyData} type="Hourly"/>
				</card.Content>
			</card.Root>
		</motion.div>
		
		<motion.div
		initial={{opacity:0, y:25}}
		whileInView={{opacity: 1, y: 0}}
		viewport={{once: true, amount: 0.2}}
		transition={{duration:0.6}}
		>
			<card.Root class="w-full min-w-0">
				<card.Header>
					<card.Title>Daily Forecast</card.Title>
				</card.Header>

				<card.Content class="min-w-0">
					<Tabs data={dailyData} type="Daily"/>
				</card.Content>
			</card.Root>
		</motion.div>

		<!-- Cards stack on narrow screens and form two columns on larger screens. -->
		<section class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">

			<motion.div
			initial={{opacity:0, y:25}}
			whileInView={{opacity: 1, y: 0}}
			viewport={{once: true, amount: 0.2}}
			transition={{duration:0.7}}
			>
			
				<card.Root class="min-w-0">
					<card.Header>
						<card.Title>Precipitation</card.Title>
					</card.Header>
					<card.Content class="flex items-center gap-3">
						
						<motion.div
							initial={{opacity: 0, y: 15}}
							animate={{opacity: 1, y: 0}}
							transition={{duration: 0.8}}
						>
							<Droplet class="h-10 w-10"/>
						</motion.div>

						<p class="text-3xl font-extrabold sm:text-4xl">
							{precipitation}%
						</p>
					
					</card.Content>
				</card.Root>

			</motion.div>

			<motion.div
			initial={{opacity:0, y:25}}
			whileInView={{opacity: 1, y: 0}}
			viewport={{once: true, amount: 0.2}}
			transition={{duration:0.8}}
			>
				<card.Root class="min-w-0">
					<card.Header>
						<card.Title>Sun</card.Title>
					</card.Header>
					<card.Content class="flex items-center gap-3">
					
						<WeatherIcon icon="clear-day" class="h-5 w-5 shrink-0" />
						<Progress value={sun} class="min-w-0 flex-1" />
						<WeatherIcon icon="clear-night" class="h-5 w-5 shrink-0" />
					
					</card.Content>
					<card.Footer class="flex justify-between">
						
						<h4>{current.sunrise.slice(0,5)}</h4>
						<h4>{current.sunset.slice(0,5)}</h4>
					
					</card.Footer>
				</card.Root>
			</motion.div>
			
			<motion.div
			initial={{opacity:0, y:25}}
			whileInView={{opacity: 1, y: 0}}
			viewport={{once: true, amount: 0.2}}
			transition={{duration:0.9}}
			>
				<card.Root class="min-w-0">
					<card.Header>
						<card.Title>Visibility</card.Title>
					</card.Header>
					<card.Content class="flex items-center gap-3">
						
						<motion.div
							initial={{opacity: 0, y: 15}}
							animate={{opacity: 1, y: 0}}
							transition={{duration: 1.1}}
						>
							<EyeDashed class="h-10 w-10"/>
						</motion.div>
						<p class="text-3xl font-extrabold sm:text-4xl">
							{current.visibility ?? "—"} km
						</p>
					</card.Content>
				</card.Root>
			</motion.div>

			<motion.div
			initial={{opacity:0, y:25}}
			whileInView={{opacity: 1, y: 0}}
			viewport={{once: true, amount: 0.2}}
			transition={{duration:1}}
			>
				<card.Root class="min-w-0">
					<card.Header>
						<card.Title>Wind</card.Title>
					</card.Header>
					<card.Content class="flex items-center gap-4">
						
						<motion.div
							initial={{opacity: 0, y: 15}}
							animate={{opacity: 1, y: 0}}
							transition={{duration: 1.2}}
						>
							<ArrowUp
								class="h-7 w-7 shrink-0"
								style={`transform: rotate(${(current.winddir + 180) % 360}deg)`}
							/>
						</motion.div>

						<p class="text-3xl font-extrabold sm:text-4xl">
							{current.windspeed} <span class="text-base">km/h</span>
						</p>
					</card.Content>
				</card.Root>
			</motion.div>

		</section>

	{/if}

</main>