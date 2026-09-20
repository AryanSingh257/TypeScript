
const container = document.querySelector("#container");
const addBtn = document.querySelector("#addBtn");

addBtn.addEventListener("click", () => {
    const card = document.createElement("div");
    card.classList.add("card");

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("maxlength", "250");
    input.setAttribute("placeholder", "Start typing...");

    const label = document.createElement("label");
    label.classList.add("count")
    label.innerText = "0/250";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerText = "Delete"
    
    deleteBtn.addEventListener("click",()=>{
        container.removeChild(card);
    });
    
    card.appendChild(input);
    card.appendChild(label);
    card.appendChild(deleteBtn);
    container.appendChild(card);

    input.addEventListener("input", () => {
        const count = input.value.length;

        label.innerText = `${count}/250`;

        const con = count === 250;

        card.classList.toggle("maxCard", con);
        input.classList.toggle("maxInput",con);
    });
});