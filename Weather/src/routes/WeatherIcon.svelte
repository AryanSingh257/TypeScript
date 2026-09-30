<script lang="ts">
    import {
        Sun,
        Moon,
        Cloud,
        CloudSun,
        CloudMoon,
        CloudSnow,
        CloudFog,
        CloudRain,
        Wind
    } from "@lucide/svelte/icons";
    import { motion } from "@humanspeak/svelte-motion";

    let { icon, class: className = "" }: { icon: string, class?: string } = $props();
</script>

<motion.div
initial={{opacity: 0, y: 15}}
animate={{opacity: 1, y: 0}}
transition={{duration: 0.6}}
>

    {#if icon === "clear-day"}
        <Sun class={className} />

    {:else if icon === "clear-night"}
        <Moon class={className} />

    {:else if icon === "partly-cloudy-day"}
    <CloudSun class={className} />

    {:else if icon === "partly-cloudy-night"}
        <CloudMoon class={className} />

    {:else if icon === "cloudy"}
        <Cloud class={className} />

    {:else if icon === "rain"}
        <CloudRain class={className} />

    {:else if icon === "fog"}
        <CloudFog class={className} />

    {:else if icon === "snow"}
    <CloudSnow class={className} />

    {:else if icon === "wind"}
    <Wind class={className}/>

    {:else}
        <Cloud class={className} />
    {/if}

</motion.div>