const card = document.querySelector("#cookie-card")
const Duration:number = 1000;

function sleep(ms:number){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function cardPopUp():Promise<void> {
    await sleep(Duration);
    card.classList.add("show"); 
}

const Button = document.querySelectorAll("button");

Button.forEach((button)=>{
    button.addEventListener("click",()=>{
        localStorage.setItem("visited",true);
    });
});

const header = document.querySelector("h1");

for(let i=0;i<3;i++){
    header.innerText = `${3-i}`;
    await sleep(1000);
}

if (!localStorage.getItem("visited")){
    header.innerText = "Please provide some cookies ^_^";
    cardPopUp();
}else{
    header.innerText = "Thank you for visiting again";
}
