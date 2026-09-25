<script lang="ts">

    import {page} from "$app/state";
    import {resolve} from "$app/paths";
    import { goto } from "$app/navigation";

</script>

<div id="container">

    <h1>Rules</h1>
    <ul id="rules">
        <li>Each question has a time limit.</li>
        <li>The timer resets when you move to the next question.</li>
        <li>Select one answer per question.</li>
        <li>Once an answer is selected, the options are locked.</li>
        <li>Correct answer: +1 point.</li>
        <li>Wrong answer: -1 point.</li>
        <li>If the timer runs out: -1 point and the quiz automatically moves to the next question.</li>
        <li>Your score cannot go below 0.</li>
        <li>Questions are shuffled each time the quiz starts.</li>
        <li>The quiz ends after the final question or when the quiz timer reaches its end condition.</li>
    </ul>
    <button 
    id="startBtn" 
    aria-label="Button for starting the quiz" 
    aria-current={page.url.pathname === '/quiz' ? 'page' : undefined} 
    onclick={()=>{goto(resolve('/quiz'))}}>
        Start
    </button>

</div>

<style>

    @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&display=swap');
    
    :global(html),:global(body){
        height: 100%;
        /* padding-left: 1em; */
        font-family: "Inconsolata", monospace;
        font-optical-sizing: auto;
        font-style: normal;
        font-variation-settings: "wdth" 100;
        margin-left: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #container{
        /* height: 50%; */
        width: 70%;
        padding: 1em;
        /* background-color: bisque; */
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        font-size: 1.3em;
    }

    #startBtn{
        height: 50px;
        width: 200px;
        border: 0;
        border-radius: 5px;
        background: #111;
        color: white;
        margin-top: 2em;
        font-weight: 7001;

        box-shadow:
            0 5px 10px rgb(0 0 0 / 10%),
            0 12px 25px rgb(0 0 0 / 8%);

        transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
    }

    #startBtn:hover{
        transform: translateY(-3px);
        background: #333;
        box-shadow:
            0 6px 10px rgb(0 0 0 / 15%),
            0 12px 25px rgb(0 0 0 / 10%);
    }

</style>