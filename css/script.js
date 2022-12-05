const toDos = [
  "3 Litre Su İç",
  "Ödevleri Yap",
  "EN az 3 Saat Kodlama Yap",
  "Yemek Yap",
  "50 Sayfa Kitap Oku",
];

window.addEventListener("DOMContentLoaded", () => {
  toDos = JSON.parse(localStorage.getItem("toDos")) || toDos;
  toDos.forEach((todo) => newElement(todo));
});

const todoList = document.getElementById("list");
let toDoInput = document.getElementById("task");

toDos.forEach(function (toDo) {
  createNewElement(toDo);
});

function createNewElement(toDo) {
  const liDOM = document.createElement("li");
  const todonode = document.createTextNode(toDo);
  liDOM.className = "list-group-flush";
  liDOM.appendChild(todonode);
  todoList.appendChild(liDOM);

  const btnSpanNode = document.createElement("span");
  const text = document.createTextNode("\u00D7");
  btnSpanNode.className = "close";
  btnSpanNode.appendChild(text);
  liDOM.append(btnSpanNode);

  btnSpanNode.onclick = function () {
    const liDOM = this.parentElement;
    liDOM.style.display = "none";
    liDOM.classList.remove("checked");
  };

  todoList.addEventListener("click", function (toDo) {
    if (toDo.target.tagName == "LI") {
      toDo.target.classList.toggle("checked");
      ToggleDeleteButton();
    }
  });
  return todoList;
}
document.querySelector("#deleteAll").onclick = function () {
  const element = document.querySelectorAll(".checked");
  element.forEach(function (toDoInput) {
    toDoInput.style.display = "none";
  });
};

function ToggleDeleteButton() {
  const checkList = document.querySelectorAll(".checked");
  if (checkList.length > 0) {
    document.querySelector("#deleteAll").classList.remove("d-none");
  } else {
    document.querySelector("#deleteAll").classList.add("d-none");
  }
}

function newElement(todo = "") {
  if (todo != "") toDoInput.value = todo;
  if (toDoInput.value == "") return $("#liveToastEmpty").toast("show");
  toDoInput.value = toDoInput.value.replace(/\s+/g, " "); //Kelimeler arasında birden fazla boşluk varsa tek boşluğa düşür.
  todoList.append (createNewElement(toDoInput.value));
  if (todo == "") {
    $("#liveToastSuccess").toast("show");
    toDos.push(toDoInput.value);
  }
  localStorage.setItem("toDos", JSON.stringify(toDos));
  toDoInput.value = "";
}
