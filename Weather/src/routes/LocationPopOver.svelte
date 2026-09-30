<script lang="ts">

    import * as popover from "$lib/components/ui/popover/index"
    import Label from "$lib/components/ui/label/label.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { buttonVariants } from "$lib/components/ui/button";
    
    let { locationOpen, location, submitLocation, fetchUserLocation, searching, searchLocation } = $props();

</script>

<popover.Root bind:open={locationOpen}>
    <popover.Trigger class={buttonVariants({ variant: "outline" })}>
        {location}
    </popover.Trigger>

    <popover.Content class="w-[min(90vw,22rem)]">
        <form
            class="flex flex-col gap-4"
            onsubmit={(event) => {
                event.preventDefault();
                submitLocation();
            }}
        >
            <div class="flex flex-col gap-2">
                <Label for="locationCity">City</Label>
                <Input
                    id="locationCity"
                    placeholder="Eg. Hyderabad"
                    bind:value={searchLocation.city}
                    required
                />
            </div>

            <div class="flex flex-col gap-2">
                <Label for="locationState">State (optional)</Label>
                <Input
                    id="locationState"
                    placeholder="Eg. TS"
                    bind:value={searchLocation.state}
                />
            </div>

            <div class="flex flex-col gap-2">
                <Label for="locationCountry">Country (optional)</Label>
                <Input
                    id="locationCountry"
                    placeholder="Eg. IN"
                    bind:value={searchLocation.country}
                />
            </div>

            <Button type="submit" disabled={searching}>
                {searching ? "Searching..." : "Show Weather"}
            </Button>
        </form>
        <Button
        onclick={(event) => {
            event.preventDefault();
            fetchUserLocation();
        }}
        disabled={searching}
        >
            {searching ? "Searching..." : "Take my location."}
        </Button>
    </popover.Content>
</popover.Root>