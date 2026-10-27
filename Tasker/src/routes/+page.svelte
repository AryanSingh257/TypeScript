<script lang="ts">

import { Trash, Search, CircleAlert } from '@lucide/svelte';
import { toast } from "svelte-sonner";
import { onMount } from 'svelte';
import { Button, buttonVariants } from '#lib/components/ui/button/index.ts';

import * as Field from '#lib/components/ui/field/index.ts'
import * as InputGroup from "#lib/components/ui/input-group/index.ts";
import * as Card from '#lib/components/ui/card/index.ts';
import * as Dialog from '#lib/components/ui/dialog/index.ts';

import Checkbox from '#lib/components/ui/checkbox/checkbox.svelte';

type Task = {
    uuid: string,
    checked: boolean,
    taskName: string,
    taskDesc: string,
};

type Tasks = Task[];

let loading = $state(true)
let error = $state("")
let allthetasks = $state<Tasks>([]);
let taskName = $state<string>('');
let taskDesc = $state<string>('');
let addDialogOpen = $state(false);

function loadLocalStorage(){
    loading = true;
    error = '';

    try {
        let tasks = localStorage.getItem('tasks');
        allthetasks = tasks ? JSON.parse(tasks) : [];
    } catch (err) {
        error = err instanceof Error ? err.message : String(err);
    } finally {
        loading = false;
    }
}

onMount(()=>{
    loadLocalStorage();    
});

function refreshLocalStorage(): void{
    localStorage.setItem('tasks',JSON.stringify(allthetasks));
}

function addNewTask(givenTaskName: string,givenTaskDesc: string): void{
    let newTask = {
        uuid: crypto.randomUUID(),
        checked: false,
        taskName: givenTaskName,
        taskDesc: givenTaskDesc
    }

    allthetasks.push(newTask);
    
    refreshLocalStorage();
}

function delteTask(id: string): void{
    allthetasks = allthetasks.filter(task => task.uuid !== id);

    refreshLocalStorage();
}

let searching = $state<string>('');
let query = $derived(searching.trim().toLowerCase());
let taskings = $derived<Tasks>(
    query ? allthetasks.filter(task => {
        return task.taskName.trim().toLowerCase().includes(query)
    }) : allthetasks
);

</script>

{#snippet repeatableTasks(tasker: Task)}
    <Card.Root class="mt-4">
        <Card.Header >
            <Checkbox checked={tasker.checked} onCheckedChange={(checked)=>{
                tasker.checked = !!checked;
                refreshLocalStorage();
            }}/>

            <Card.Title>
                {#if tasker.checked}
                    <s>{tasker.taskName}</s>
                {:else}
                    {tasker.taskName}
                {/if}
            </Card.Title>

            <Card.Description>{tasker.taskDesc}</Card.Description>
            
            <Card.Action>
                <Button
                    variant="ghost"
                    onclick={() => delteTask(tasker.uuid)}
                    size="icon"
                    type="button"
                    class="shrink-0 text-stone-500 hover:bg-red-50 hover:text-red-600"
                    aria-label={`Delete ${tasker.taskName}`}
                >
                    <Trash/>
                </Button>
            </Card.Action>
        </Card.Header>
    </Card.Root>
{/snippet}

<div class="flex min-h-dvh w-full flex-col">

    <header class="mx-auto w-full px-4 pb-7 pt-9 sm:px-6 sm:pt-9">
        <h1 class="text-6xl font-light tracking-tight text-balance">
            Tasker
        </h1>

        <h2 class="text-xl tracking-tight text-balance ml-2 mt-0.5 text-stone-700">
            A "Tasker" to task your 'tasks'.
        </h2>
    </header>

    <main class="mx-auto flex w-full flex-1 flex-col px-4 pb-8 sm:px-6">

        <InputGroup.Root>
            <InputGroup.Input placeholder="Search..." type="search" bind:value={searching}/>
            <InputGroup.Addon>
                <Search/>
            </InputGroup.Addon>
        </InputGroup.Root>

        <span class="text-muted-foreground text-left text-sm mt-2 leading-normal font-normal text-balance">Take out your tasks.</span>

        {#if loading}
            <div class="flex min-h-[10dvh] items-center justify-center">
                <h2 class="shimmer font-semibold">
                    Loading
                </h2>
            </div>
        {:else if error}
            <div class="flex min-h-[10dvh] flex-col items-center justify-center gap-3 text-center">
                <CircleAlert class="h-10 w-10" />
                <h2 class="shimmer text-lg font-semibold">{error}</h2>
                <Button onclick={() => loadLocalStorage()}>Try Again</Button>
            </div>
        {:else}
            {#each taskings as task}
                {@render repeatableTasks(task)}
            {:else}
                <p class = "py-8 text-center text-muted-foreground">
                    {searching
                        ? 'No tasks match your search.'
                        : 'No tasks yet. Task one first.'}
                </p>
            {/each}
        {/if}
        

    </main>

    <footer class="mx-auto mt-auto w-full px-4 pb-6 sm:px-6">

        <Dialog.Root bind:open={addDialogOpen}>
            <form>
                <Dialog.Trigger type="button" class={buttonVariants({ variant: "default" })}>
                    Add new task
                </Dialog.Trigger>
                <Dialog.Content class="sm:max-w-sm">
                    <Dialog.Header>
                        <Dialog.Title>Add a new Task</Dialog.Title>
                        <Dialog.Description>
                            Add a new task to your tasker to task it out later.
                        </Dialog.Description>
                    </Dialog.Header>
                    <Field.Group>
                        <Field.Field>

                            <Field.Label for="taskName">Name</Field.Label>
                            <InputGroup.Root>
                                <InputGroup.Input id="taskName" placeholder="Task you might do..." bind:value={taskName}/>
                            </InputGroup.Root>
                        
                        </Field.Field>
                        <Field.Field>
                        
                            <Field.Label for="taskDesc">Description</Field.Label>
                            <InputGroup.Root>
                                <InputGroup.Input id="taskDesc" placeholder="Things you will like to remember.." bind:value={taskDesc}/>
                            </InputGroup.Root>
                        
                        </Field.Field>
                    </Field.Group>
                    <Dialog.Footer>
                        <Dialog.Close type="button" class={buttonVariants({ variant: "outline" })}>
                            Cancel
                        </Dialog.Close>
                        <Button
                            onclick={() => {
                                if(!taskName.trim()){
                                    toast.error("Please enter a task name");
                                    return;
                                }

                                addNewTask(taskName,taskDesc);
                                taskName = '';
                                taskDesc = '';
                                addDialogOpen=false;
                                toast.success("Your task has been tasked");
                            }}
                        >
                        <!-- <Button type="submit"> -->
                            Add
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </form>
        </Dialog.Root>

    </footer>
</div>