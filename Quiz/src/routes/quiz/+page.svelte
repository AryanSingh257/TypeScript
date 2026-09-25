<script lang="ts">

import { onMount } from "svelte";

type Question = {
    id: number,
    category: 'HTML' | 'CSS' | 'JavaScript' | 'TypeScript',
    question: string,
    options: string[],
    correctAnswer: number,
}

const timeLimit = 30; // 5 minutes, in seconds

let questions: Question[] = $state([]);
let currentQuestion: number = $state(0);
let selectedAnswer: number | null = $state<number | null>(null);
let score: number = $state(0);
let timeLeft: number = $state(timeLimit);

let error = $state("");
let loading: boolean = $state(true);
let finished: boolean = $state(false)

let question: Question = $derived(questions[currentQuestion] ?? null);
let totalQuestions: number = $derived(questions.length);
let isLastQuestion: boolean = $derived(currentQuestion === totalQuestions - 1);
let isAnswered = $derived(selectedAnswer !== null);

let isCorrect = $derived(
    isAnswered && selectedAnswer === question?.correctAnswer
);

let timerProgress = $derived(timeLeft / timeLimit);

let formatedTime = $derived(
    `${String(timeLeft%60).padStart(2,"0")}s`
);

function shuffleQuestion(items: Question[]): Question[]{
    let shufffle = [...items];

    for(let i=shufffle.length-1;i>0;i--){
        const j = Math.floor(Math.random() * (i+1));
        shufffle[i],shufffle[j]=shufffle[j],shufffle[i];
    }

    return shufffle;
}

const circumference = 2 * Math.PI * 13.5;
let timer: ReturnType<typeof setInterval>;

onMount(()=>{

    async function loadQuestions() {

        try {
            const response = await fetch("/questions.json");
            
            if(!response.ok){
                throw new Error("Failed to load questions!");
            }
    
            const data: {questions: Question[]} = await response.json();
            
            if(!Array.isArray(data.questions) || data.questions.length === 0){
                throw new Error("No questions were found!")
            }

            questions = shuffleQuestion(data.questions);
        } catch (err: unknown) {
            error = err instanceof Error ? err.message : "Something went wrong";
        }finally{
            loading = false;
        }
        
    }
    
    loadQuestions();
    
    timer = setInterval(() => {
        if(loading || finished || error) return;

        if (timeLeft > 0) {
            timeLeft--;
        } else {
            score = Math.max(0, score - 1);
            nextQuestion();
            timeLeft = timeLimit;
        }
    }, 1000);

    return () => clearInterval(timer);
});

function selectAnswer(index: number): void{
    if(!question || isAnswered || finished) return;

    selectedAnswer = index

    if(isCorrect){
        score++;
    }else{
        score = Math.max(0, score - 1);
    }
}

function nextQuestion(){
    if(finished) return;

    if(isLastQuestion){
        finished = true;
        return;
    }

    timeLeft = timeLimit;

    currentQuestion++;
    selectedAnswer = null;
}

</script>

{#if loading}

<div id="loader">
    <p id="loading-msg">Loading Questions...</p>
</div>

{:else if error}

<div id="loader">
    <p id="loading-msg">{error}</p>
</div>

{:else if finished}

<div id="loader">
    <p>Thank You for attending.</p>
    <p>Your final score is {score} / {questions.length}.</p>
</div>

{:else}

<main>

    <div id="question-card" class="card">
        
        <div id="ques">

            {#if question}
                <p id="category">
                    {question.category}
                </p>
                <p class="labels">
                    {question.question}
                </p>
            {/if}

            <div id="answers">
            
                {#each question.options as option,i}
                    <button
                    class="answerBtn"
                    class:correct={isAnswered && i === question.correctAnswer}
                    class:wrong={isAnswered && i !== question.correctAnswer}
                    disabled={isAnswered}
                    aria-pressed={selectedAnswer === i}
                    onclick={() => selectAnswer(i)}
                    >
                        {option}
                    </button>
                {/each}
                    
            </div>

        </div>

        <footer>

            <p>Question {currentQuestion+1} of {questions.length}</p>
            
            <button
            id="nextBtn"
            disabled={!isAnswered}
            onclick={nextQuestion}
            >
                {isLastQuestion ? "FInish Quiz." : "Next Question"}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
            </button>
            
        </footer>
        
    </div>

    <div id="scoreTime" class="card">
        
        <div id="time">

            <p class="labels">Time Left</p>
            <div id="stopwatch">
                <svg viewBox="0 0 32 32" aria-label={`${timeLeft} seconds remaining`}>
                    <!-- Background track -->
                    <circle
                        cx="16"
                        cy="16"
                        r="13.5"
                        stroke="rgba(255, 255, 255, 0.15)"
                        stroke-width="5"
                        fill="none"
                    />

                    <!-- Animated progress ring -->
                    <circle
                        id="timerProgress"
                        cx="16"
                        cy="16"
                        r="13.5"
                        stroke="#111"
                        stroke-width="5"
                        fill="none"
                        stroke-linecap="round"
                        stroke-dasharray={circumference}
                        stroke-dashoffset={circumference * (1 - timerProgress)}
                        transform="rotate(-90 16 16)"
                    />
                </svg>

                <p id="timerText">
                    {formatedTime}
                </p>
            </div>  
            
        </div>

        <div id="score">

            <p class="labels">Score</p>
            <p id="scoreCount">{score}</p>
            
        </div>
        
    </div>

</main>

{/if}


<style>

    @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&display=swap');
    
    :global(*) {
        box-sizing: border-box;
    }

    :global(body) {
        margin: 0;
        width: 100vw;
        min-height: 100vh;
        font-family: "Inconsolata", monospace;
        background: #f3f3f3;
        color: #111;
    }


    /* =========================
    LAYOUT
    ========================= */

    main {
        width: 100%;
        min-height: 100vh;
        padding: 2rem;

        display: flex;
        gap: 2rem;
        align-items: stretch;
    }


    /* =========================
    CARDS
    ========================= */

    .card {
        border: none;
        border-radius: 18px;
        background: #fff;

        box-shadow:
            0 4px 8px rgb(0 0 0 / 5%),
            0 12px 30px rgb(0 0 0 / 8%);

        padding: 1.5rem;
    }


    /* =========================
    QUESTION CARD
    ========================= */

    #question-card {
        width: 70%;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
    }

    #ques {
        width: 100%;
        height: calc(100% - 120px);
        padding: 0 1rem;
    }

    .labels {
        font-size: 2em;
        font-weight: 700;
    }

    #category {
        color: #666;
        font-size: 1.2em;
        font-weight: 600;
    }


    /* =========================
    ANSWERS
    ========================= */

    #answers {
        width: 70%;
        height: 70%;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }

    .answerBtn {
        width: 70%;
        min-height: 55px;

        border: none;
        border-radius: 10px;

        background: #f3f3f3;
        color: #111;

        font-family: inherit;
        font-weight: 600;

        cursor: pointer;

        box-shadow:
            0 3px 6px rgb(0 0 0 / 8%),
            0 6px 15px rgb(0 0 0 / 5%);

        transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease-out;
    }


    /* Button rises */

    .answerBtn:disabled{
        cursor: not-allowed;
    }

    .answerBtn:not(:disabled):hover {
        transform: translateY(-3px);

        /* background: #fff; */

        box-shadow:
            0 6px 10px rgb(0 0 0 / 10%),
            0 12px 25px rgb(0 0 0 / 8%);
    }


    /* Button presses down */

    .answerBtn:not(:disabled):active {
        transform: translateY(0);

        box-shadow:
            0 2px 4px rgb(0 0 0 / 10%);
    }


    /* Correct answer */

    .answerBtn.correct {
        background: #111;
        color: #fff;
    }


    /* Wrong selected answer */

    .answerBtn.wrong {
        background: #eee;
        /* color: #111; */
    }


    /* =========================
    FOOTER
    ========================= */

    footer {
        width: 100%;
        height: 100px;

        padding: 1rem 1.25rem;

        border-radius: 12px;

        background: #111;
        color: #fff;

        display: flex;
        justify-content: space-between;
        align-items: center;

        font-size: 1.2em;
        font-weight: 600;

        box-shadow:
            0 5px 10px rgb(0 0 0 / 10%),
            0 12px 25px rgb(0 0 0 / 8%);
    }


    /* =========================
    NEXT BUTTON
    ========================= */

    #nextBtn {
        height: 70%;
        min-width: 180px;

        padding: 0 1.5rem;

        border: none;
        border-radius: 9px;

        background: #fff;
        color: #111;

        font-family: inherit;
        font-weight: 700;

        display: flex;
        justify-content: space-evenly;
        align-items: center;

        cursor: pointer;

        box-shadow:
            0 3px 6px rgb(0 0 0 / 12%),
            0 7px 15px rgb(0 0 0 / 8%);

        transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
    }

    #nextBtn:not(:disabled):hover {
        transform: translateY(-3px);

        box-shadow:
            0 6px 10px rgb(0 0 0 / 15%),
            0 12px 25px rgb(0 0 0 / 10%);
    }

    #nextBtn:not(:disabled):active {
        transform: translateY(0);
    }

    #nextBtn:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }

    #nextBtn svg{
        scale: 0.4;
    }


    /* =========================
    SIDEBAR
    ========================= */

    #scoreTime {
        width: 30%;

        padding: 0;

        display: flex;
        flex-direction: column;
        gap: 2rem;

        border: none;
        background: transparent;
        box-shadow: none;
    }


    /* =========================
    TIMER
    ========================= */

    #time {
        flex: 6;

        width: 100%;

        border-radius: 18px;

        background: #fff;
        color: #111;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;

        box-shadow:
            0 4px 8px rgb(0 0 0 / 5%),
            0 12px 30px rgb(0 0 0 / 8%);
    }

    #stopwatch {
        width: 160px;
        height: 160px;

        position: relative;

        display: grid;
        place-items: center;
    }

    #stopwatch svg {
        width: 100%;
        height: 100%;
    }

    #timerText {
        position: absolute;

        margin: 0;

        font-size: 1.5rem;
        font-weight: 700;

        color: #111;

        pointer-events: none;
    }

    #timerProgress {
        transition: stroke-dashoffset 1s linear;
    }


    /* =========================
    SCORE
    ========================= */

    #score {
        flex: 4;

        width: 100%;

        border-radius: 18px;

        background: #fff;
        color: #111;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        gap: 1rem;

        box-shadow:
            0 4px 8px rgb(0 0 0 / 5%),
            0 12px 30px rgb(0 0 0 / 8%);
    }

    #score .labels,
    #scoreCount {
        margin: 0;
    }

    #scoreCount {
        font-size: 4em;
        font-weight: 700;
    }


    /* =========================
    LOADING
    ========================= */

    #loader {
        min-height: 100vh;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        font-size: 2em;
        font-weight: 600;
    }

</style>