<script lang="ts">

	import { LineChart, AreaChart, defaultChartPadding } from "layerchart";
    import { motion } from "@humanspeak/svelte-motion";

    let { data, type }: { data: any ,type: "LineChart" | "AreaChart" } = $props();

</script>

<motion.div
initial={{opacity:0, x:-25}}
whileInView={{opacity: 1, x: 0}}
viewport={{once: true, amount: 0.2}}
transition={{duration:0.6}}
>

    {#if type === "LineChart"}
        
        <div class="w-full min-w-0">
            <LineChart
                data={data}
                x="dateTime"
                series={[
                    { key: "temp", color: "red" },
                    { key: "feelsLike", color: "green" }
                ]}
                padding={defaultChartPadding({ right: 10, top: 10 })}
                height={300}
                class="w-full"
            />
        </div>

    {:else if type === "AreaChart"}

        <div class="w-full min-w-0">
            <AreaChart
                data={data}
                x="dateTime"
                series={[
                    { key: "minTemp", color: "blue" },
                    { key: "feelsLike", color: "green" },
                    { key: "maxTemp", color: "red" }
                ]}
                padding={defaultChartPadding({ right: 10, top: 10 })}
                height={300}
                class="w-full"
            />
        </div>

    {/if}

</motion.div>

