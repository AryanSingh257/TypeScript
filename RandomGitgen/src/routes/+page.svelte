<script lang="ts">

import Button from "#lib/components/ui/button/button.svelte";

import Selector from "./Selector.svelte";
import Repo from "./Repo.svelte";

let selectedLang = $state("");
let submitted = $state(false)
let showValidation = $state(false);
let generationRequest = $state(0);

function handleSubmit() {
    if(!selectedLang){
        showValidation = true;
        return;
    }

    showValidation = false;
    generationRequest++;
    submitted = true;
}

</script>

<main class="bg-amber-50 w-full min-h-screen flex flex-col justify-center p-10">

    <h1
    class="text-left text-9xl font-extrabold tracking-tight"
    >
    Random Github Repo Generator
    </h1>

    <div class="w-full flex justify-between">

        <Button type="submit" onclick={handleSubmit}>
        Generate
        </Button>
    
        <Selector bind:value={selectedLang}/>

    </div>
    
    {#if showValidation}

        <h2
        class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
        >
        Select a language before submiting.
        </h2>

        <p class="leading-7 not-first:mt-6">
        Please choose a language from the selector before clicking on the submit button.
        </p>

    {/if}

    {#if submitted}

        <Repo language={selectedLang} requestId={generationRequest}/>
    
    {/if}

</main>