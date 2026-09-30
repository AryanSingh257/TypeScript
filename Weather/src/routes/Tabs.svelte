<script lang="ts">

    import * as Tabs from "$lib/components/ui/tabs/index";
    import WindTab from "./WindTab.svelte";
    import Chart from "./Chart.svelte";

    let { data, type }: {data: any, type: "Hourly" | "Daily"} = $props();

</script>

{#if type === "Hourly"}
    
<Tabs.Root value="condition" class="w-full">
    <Tabs.List>
        <Tabs.Trigger value="condition">Conditions</Tabs.Trigger>
        <Tabs.Trigger value="wind">Winds</Tabs.Trigger>
    </Tabs.List>

    <Tabs.Content value="condition" class="min-w-0 overflow-hidden">
        <Chart data={data} type="LineChart" />
    </Tabs.Content>

    <Tabs.Content value="wind" class="min-w-0">
        <WindTab Data={data}/>
    </Tabs.Content>
</Tabs.Root>

{:else}

<Tabs.Root value="condition" class="w-full">
    <Tabs.List>
        <Tabs.Trigger value="condition">Conditions</Tabs.Trigger>
        <Tabs.Trigger value="wind">Winds</Tabs.Trigger>
    </Tabs.List>

    <Tabs.Content value="condition" class="min-w-0 overflow-hidden">
        <Chart data={data} type="AreaChart" />
    </Tabs.Content>

    <Tabs.Content value="wind" class="min-w-0">
        <WindTab Data={data}/>
    </Tabs.Content>
</Tabs.Root>

{/if}
