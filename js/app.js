const inputTarefa = document.querySelector(".input");
const btnTarefa = document.querySelector(".btn");
const ulTarefas = document.querySelector(".ul-tarefas");

const createLis = () => {
    const li = document.createElement("li");
    return li;
}

inputTarefa.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;

        createToDos(inputTarefa.value);
    }
})

const clearToDos = () => {
    inputTarefa.value = "";
    inputTarefa.focus();
}

const createDeleteButton = (li) => {
    li.innerText += " ";
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Apagar";
    deleteBtn.setAttribute("class", "delete-btn");
    deleteBtn.setAttribute("title", "apaga essa porra");

    li.appendChild(deleteBtn);
}

const createToDos = (textInput) => {
    const li = createLis();

    li.innerText = textInput;
    ulTarefas.appendChild(li);

    clearToDos();
    createDeleteButton(li);
    saveToDo();
}


btnTarefa.addEventListener("click", () => {
    if (!inputTarefa.value) return;

    createToDos(inputTarefa.value);
})

document.addEventListener("click", (e) => {
    const el = e.target;

    if (el.classList.contains("delete-btn")) {
        el.parentElement.remove();
        saveToDo();
    }
})

const saveToDo = () =>{
    const lisTarefas = ulTarefas.querySelectorAll("li");
    const listaDeTarefas = [];

    for (let tarefa of lisTarefas) {
        let tarefaTexto = tarefa.innerText;

        tarefaTexto = tarefaTexto.replace("Apagar", "").trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJson = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJson);
}

const addSaveToDo = () =>{
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas)

    for(let tarefa of listaDeTarefas){
        createToDos(tarefa)
    }
}

addSaveToDo();