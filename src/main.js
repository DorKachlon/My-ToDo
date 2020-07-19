//הגדרות משתנים
const addButton = document.getElementById("addButton");
const textInput = document.getElementById("textInput");
const prioritySelector = document.getElementById("prioritySelector");
const ullist = document.querySelector("ul");
let deletedArr = [];
const undoButton = document.getElementById("undoButton");

//זימון אירוע לחיצה על add
addButton.addEventListener("click", addToDo);
textInput.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        addToDo();
    }
});



//פעולה שמוסיפה משימה לרשימה addToDo
function addToDo() {
    let inputValue = textInput.value;
    if (inputValue != "") {
        textInput.value = '';
        const todoContainer = document.createElement("div"); //מסגרת לכל מטלה
        const todoText = document.createElement("div"); //הטקסט של המטלה
        const todoCreatedAt = document.createElement("div"); //הזמן שנרשמה המטלה
        const todoPriority = document.createElement("div"); //עדיפות מ-1 עד 5
        const deleteButton = document.createElement("button");
        const checkBox = document.createElement("input");

        todoContainer.className = "todoContainer";
        todoText.className = "todoText";
        todoCreatedAt.className = "todoCreatedAt";
        todoPriority.className = "todoPriority";
        deleteButton.className = "deleteButton";


        todoText.innerHTML = inputValue;
        todoPriority.innerHTML = prioritySelector.value;
        let d = new Date();
        todoCreatedAt.innerHTML = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        deleteButton.textContent = "Delete";
        checkBox.setAttribute("type", "checkbox");

        todoContainer.append(todoText, todoCreatedAt, todoPriority, deleteButton, checkBox);
        ullist.appendChild(todoContainer);

        deleteButton.onclick = function () {
            deletedArr.push(todoContainer);
            ullist.removeChild(todoContainer);
        }
    } else {
        window.alert("The text box is empty")
    }
    textInput.focus();
}

//פעולה שמחזירה ערך שנמחק undo
undoButton.addEventListener("click", function () {
    ullist.appendChild(deletedArr.pop());
});
