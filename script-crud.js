//Encontra o botão adiiconar tarefa

const addTask = document.querySelector(".app__button--add-task");
const formAddTask = document.querySelector(".app__form-add-task");
const textearea = document.querySelector(".app__form-textarea");
const ulTask = document.querySelector(".app__section-task-list");
const btnCancel = document.querySelector(".app__form-footer__button--cancel");

const btnRemove = document.querySelector("#btn-remover-concluidas");
const btnRemoveAll = document.querySelector("#btn-remover-todas");

const ParagraphDescription = document.querySelector(
  ".app__section-active-task-description"
);

//Armazena o valor, do Local Storage
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let taskSelect = null;
let liTaskSelect = null;

//Função na qual converte armazena a lista na local storage
function updateTask() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function createTaskTag(task) {
  const createLi = document.createElement("li");
  createLi.classList.add("app__section-task-list-item");

  const createSvg = document.createElement("svg");
  createSvg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
      <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
  `;

  const creatP = document.createElement("p");
  creatP.classList.add("app__section-task-list-item-description");
  creatP.textContent = task.descricao;

  const button = document.createElement("button");
  button.classList.add("app_button-edit");
  const createImg = document.createElement("img");

  if (task.complete) {
    createLi.classList.add("app__section-task-list-item-complete");
    button.setAttribute("disabled", "disabled");
  } else {
    button.onclick = () => {
      const newDescription = prompt("Qual é a nova Tarefa?");
      if (newDescription === "" || newDescription === null)
        alert("Valor invalido");
      else {
        creatP.textContent = newDescription;
        task.descricao = newDescription;
        updateTask();
      }
    };
  }

  createImg.setAttribute("src", "/imagens/edit.png");
  button.append(createImg);

  createLi.append(createSvg, creatP, button);

  createLi.onclick = () => {
    // debugger;
    document
      .querySelectorAll(".app__section-task-list-item-active")
      .forEach((element) =>
        element.classList.remove("app__section-task-list-item-active")
      );
    if (taskSelect == task) {
      ParagraphDescription.textContent = "";
      taskSelect = null;
      liTaskSelect = null;
      return;
    }
    taskSelect = task;
    liTaskSelect = createLi;
    ParagraphDescription.textContent = task.descricao;
    createLi.classList.add("app__section-task-list-item-active");
  };

  return createLi;
}

addTask.addEventListener("click", () => formAddTask.classList.toggle("hidden"));

formAddTask.addEventListener("submit", (event) => {
  event.preventDefault();
  const tarefa = { descricao: textearea.value };
  tarefas.push(tarefa);

  const ElemetTask = createTaskTag(tarefa);
  ulTask.append(ElemetTask);

  updateTask();

  textearea.value = "";
  formAddTask.classList.add("hidden");
});

btnCancel.addEventListener("click", () => {
  textearea.value = "";
  formAddTask.classList.toggle("hidden");
});

tarefas.forEach((tarefa) => {
  const ElemetTask = createTaskTag(tarefa);
  ulTask.append(ElemetTask);
});

document.addEventListener("FocoFinalizado", () => {
  if (taskSelect && liTaskSelect) {
    liTaskSelect.classList.remove("app__section-task-list-item-active");
    liTaskSelect.classList.add("app__section-task-list-item-complete");
    liTaskSelect.querySelector("button").setAttribute("disabled", "disabled");

    taskSelect.complete = true;
    updateTask();
  }
});

const removeTask = (onlyComplete) => {
  const selector = onlyComplete
    ? ".app__section-task-list-item-complete"
    : ".app__section-task-list-item";

  document.querySelectorAll(selector).forEach((element) => element.remove());
  tarefas = onlyComplete ? tarefas.filter((element) => !element.complete) : [];
  updateTask();
};

btnRemove.onclick = () => removeTask(true);
btnRemoveAll.onclick = () => removeTask(false);
