<script lang="ts">

import Button from "#lib/components/ui/button/button.svelte";
import * as Card from "#lib/components/ui/card/index.ts";
import { Star, GitFork } from "@lucide/svelte";
import { Github } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/svelte";

let { language, requestId }: { language: string, requestId: number } = $props();

interface GitHubRepo {
    id: number,
    name: string,
    full_name: string,
    html_url: string,
    description: string | null,
    language: string | null,
    stargazers_count: number,
    forks_count: number,
    owner: {
        avatar_url: string
    }
}

interface GitHubSearchResponse {
    total_count: number,
    items: GitHubRepo[],
}

let repo: GitHubRepo | undefined = $state();
let error: string = $state("");
let loading: boolean = $state(false);
let readme = $state("");

async function getRandomResponse(language:string) {
    loading = true;
    error = "";
    repo = undefined;

    try{

        const params = new URLSearchParams({
            q: `language:${language}`,
            per_page: "100",
        });
    
        const response = await fetch(`https://api.github.com/search/repositories?${params}`);
    
        if(!response.ok){
            throw new Error(`GitHub API Error: ${response.status}`);
        }
    
        const data: GitHubSearchResponse = await response.json();
        
        if(data.items.length === 0){
            throw new Error("Something wrong with the response. Try again.");
        }
    
        const randomIndex = Math.floor(Math.random() * data.items.length);
        
        repo = data.items[randomIndex];

    }catch(err){
        error = err instanceof Error ? err.message : "Something went wrong. Please Try again.";
        readme = "";
    }finally{
        loading = false;
    }
}

$effect(()=>{
    if(requestId>0 && language){
        void getRandomResponse(language);
    }
})

</script>

<Card.Root class="mt-10">

    {#if loading}
    
    <div class="w-full flex justify-center items-center h-full">
        <h4 class="shimmer scroll-m-20 text-xl font-semibold tracking-tight">
        Loading...
        </h4>
    </div>

    {:else}
    <Card.Header>

        <img src={repo?.owner.avatar_url} alt="Owner Avatar" class="h-10 w-10">
        
        <Card.Title>
            {repo?.name ?? "Random Repository."}
        </Card.Title>
    
        <Card.Description>
            {repo?.description ?? "Discover a random Reposiroty."}
        </Card.Description>
    
        <Card.Action>

            <Button
            variant="link"
            href={repo?.html_url ?? undefined}
            target="_blank"
            disabled={!repo}
            >
                
                <HugeiconsIcon
                icon={Github}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
                />
                Visit Repo

            </Button>

        </Card.Action>
    
    </Card.Header>
    
    <Card.Footer class="flex w-full justify-between">
    
        <p class="text-sm text-muted-foreground">{repo?.language ?? "_"}</p>
        

        <div class="flex justify-between w-40 mr-2">
        
            <div class="flex gap-1">
            
                <Star size={16}/>
                <p class="text-sm text-muted-foreground">{repo?.stargazers_count ?? "_"}</p>
    
            </div>
            
            <div class="flex gap-1">
            
                <GitFork size={16}/>
                <p class="text-sm text-muted-foreground">{repo?.forks_count ?? "_"}</p>
                
            </div>
        
        </div>

    </Card.Footer>
    
    {/if}

</Card.Root>