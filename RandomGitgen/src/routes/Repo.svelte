<script lang="ts">

import Button from "#lib/components/ui/button/button.svelte";
import * as Card from "#lib/components/ui/card/index.ts";
import { Star, GitFork } from "@lucide/svelte";
import { Github } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/svelte";
import SvelteMarkdown from "@humanspeak/svelte-markdown";

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

        const readmeResponse = await fetch(
            `https://api.github.com/repos/${repo.full_name}/readme`,
            {
                headers: {
                    Accept: "applications/vnd.github.raw+json"
                }
            }
        );

        if(readmeResponse.ok){
            readme = await readmeResponse.text();
        }else{
            readme = "";
        }

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
    
    <Card.Content>

            {#if error}

            <p role="alert" class="text-sm text-destructive">{error}</p>

            {/if}

            {#if readme}

            <!-- <pre class="whitespace-pre-wrap wrap-break-words text-sm">{readme.slice(0, 1500)}</pre> -->

            <!-- Markdown part is not done by me bith the styles and this block ismade with gpt. -->
            <div
            class="prose prose-sm max-w-none
                    max-h-175 overflow-y-auto
                    rounded-lg border bg-white p-6
                    prose-headings:font-bold
                    prose-a:text-blue-600
                    prose-pre:overflow-x-auto"
            >
                <SvelteMarkdown source={readme} />
            </div>

            {:else}

            <p class="text-sm text-muted-foreground">
                No README available for this repository.
            </p>
                
            {/if}
        
    </Card.Content>
    
    <Card.Footer class="flex w-full justify-between">
    
        <p class="text-sm text-muted-foreground">{repo?.language ?? "_"}</p>

        <div class="flex justify-between w-20 mr-2">
        
            <div class="flex">
            
                <Star size={16}/>
                <p class="text-sm text-muted-foreground">{repo?.stargazers_count ?? "_"}</p>
    
            </div>
            
            <div class="flex">
            
                <GitFork size={16}/>
                <p class="text-sm text-muted-foreground">{repo?.forks_count ?? "_"}</p>
                
            </div>
        
        </div>

    </Card.Footer>
    
    {/if}

</Card.Root>

<style>

  :global(.prose p) {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    line-height: 1.7;
  }

  :global(.prose h1),
  :global(.prose h2),
  :global(.prose h3) {
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    line-height: 1.3;
  }

  :global(.prose ul),
  :global(.prose ol) {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    padding-left: 1.5rem;
  }

  :global(.prose li) {
    margin-top: 0.35rem;
    margin-bottom: 0.35rem;
    line-height: 1.6;
  }

  :global(.prose pre) {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background: #f3f4f6;
    overflow-x: auto;
  }

  :global(.prose img) {
    max-width: 100%;
    height: auto;
  }

  :global(.prose ul) {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-block: 1rem;
  }

  :global(.prose ol) {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin-block: 1rem;
  }

  :global(.prose li) {
    display: list-item;
    margin-block: 0.35rem;
    line-height: 1.6;
  }

  :global(.prose li > ul),
  :global(.prose li > ol) {
    margin-block: 0.35rem;
  }

  :global(.prose li > p) {
    margin-block: 0.35rem;
  }
  
</style>