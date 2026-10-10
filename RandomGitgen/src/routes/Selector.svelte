<script lang="ts">

import { ChevronDown, CircleSmall } from "@lucide/svelte";
import { tick } from "svelte";
import { Button } from "#lib/components/ui/button/index.ts";
import * as Command from "#lib/components/ui/command/index.ts";
import * as Popover from "#lib/components/ui/popover/index.ts";

import language from "#lib/languages.json"

let open = $state(false);
let triggerRef = $state<HTMLButtonElement>(null!);
let languages = $state(language);

let { value = $bindable("") } = $props<{ value: string }>();

function closeAndFocusTrigger() {
    open = false;
    tick().then(() => {
    triggerRef?.focus();
    });
}


</script>

<Popover.Root bind:open>

    <Popover.Trigger bind:ref={triggerRef}>
        {#snippet child({props})}    
            <Button
            {...props}
            variant="outline"
            role="combobox"
            class="w-100 justify-between font-semibold"
            aria-expanded={open}
            >
                {value || "Select a language."}
                <ChevronDown class="text-muted-foreground"/>
            </Button>
        {/snippet}

    </Popover.Trigger>
    <Popover.Content>
    
        <Command.Root>
    
            <Command.Input placeholder="Select Language..."/>

            <Command.List>
    
                <Command.Empty>No languages found.</Command.Empty>

                {#each languages as langGroup (langGroup.type)}
                    <Command.Group heading={langGroup.type}>
                        {#each langGroup.languages as lang (lang.name)}
                            <Command.Item
                            value={lang.name}
                            data-checked={value === lang.name}
                            onSelect={() => {
                                value = lang.name;
                                closeAndFocusTrigger();
                            }}
                            >
                                <CircleSmall color={lang.color}/>
                                {lang.name}
                            </Command.Item>
                        {/each}
                    </Command.Group>
                {/each}
    
            </Command.List>

        </Command.Root>
    </Popover.Content>

</Popover.Root>
 