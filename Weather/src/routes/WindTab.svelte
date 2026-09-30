<script lang="ts">

    import { ArrowUp, JapaneseYen } from "@lucide/svelte";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import { motion } from "@humanspeak/svelte-motion";

    let {Data} = $props();

</script>

<ScrollArea
    class="w-full min-w-0 rounded-md border"
    orientation="horizontal"
>
    <div class="flex w-max gap-3 p-3 sm:gap-4 sm:p-4">
        {#each Data as item,i (item.dateTime)}
            <motion.div
            class="flex min-w-20 flex-col items-center gap-3 no-scrollbar rounded-md bg-muted/40 p-3 text-center sm:min-w-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
            duration: 0.4,
            delay: i * 0.05
            }}
            >
                <span class="text-sm font-medium">{item.dateTime}</span>

                <motion.div
                animate={{rotate: item.windDir}}
                transition={{ type: "spring", stiffness: 100, damping: 20}}
                >
                    <ArrowUp
                        class="h-7 w-7"
                    />
                </motion.div>

                <span class="text-sm font-semibold">
                    {item.windSpeed} km/h
                </span>

                <span class="text-xs text-muted-foreground">
                    Gust {item.windGust == null ? "—" : `${item.windGust} km/h`}
                </span>
            </motion.div>
        {/each}
    </div>
</ScrollArea>