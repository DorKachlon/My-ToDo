//הגדרות משתנים
const addButton = document.getElementById("addButton");
const textInput = document.getElementById("textInput");
const prioritySelector = document.getElementById("prioritySelector");
const selectorView = document.getElementById("view");
let deletedArr = [];
const undoButton = document.getElementById("undoButton");
const counter = document.getElementById("counter");
const counterContinue = document.getElementById("counterContinue");
const sortButton = document.getElementById("sortButton");
const searchInput = document.getElementById("searchInput");
const searchigBottun = document.getElementById("searchigBottun");

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
        checkBox.className = "checkBox";

        todoText.innerHTML = inputValue;
        todoPriority.innerHTML = prioritySelector.value;
        let d = new Date();
        todoCreatedAt.innerHTML = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        deleteButton.textContent = "Delete";
        checkBox.setAttribute("type", "checkbox");

        todoContainer.append(todoText, todoCreatedAt, todoPriority, checkBox, deleteButton);
        selectorView.appendChild(todoContainer);

        deleteButton.onclick = function () {
            deletedArr.push(todoContainer);
            selectorView.removeChild(todoContainer);
            counterFnc();
        }

        counterFnc();
    } else {
        window.alert("The text box is empty")
    }
    textInput.focus();
    saveTasks();
}

//פעולה שמחזירה ערך שנמחק undo
undoButton.addEventListener("click", function () {
    selectorView.appendChild(deletedArr.pop());
    counterFnc();
    saveTasks();
});


//פעולה שסופרת כמה דיבים יש בתוך הסלקטור וויאו ומדפיסה במקום הרצוי
function counterFnc() {
    let divs = selectorView.getElementsByClassName('todoContainer').length;
    if (divs === 0) {
        counter.innerHTML = divs;
        counter.style.visibility = "hidden";
        counterContinue.innerHTML = "Nothing to do";
    }
    else if (divs === 1) {
        counter.innerHTML = divs;
        counter.style.visibility = "visible";
        counterContinue.innerHTML = "task to do";

    } else {
        counter.innerHTML = divs;
        counterContinue.innerHTML = "tasks to do";
    }
}

//זימון הפעולה של המיון בעת לחיצה 
sortButton.addEventListener("click", sortFnc);


//פעולת המיון של המטלות על פי עדיפות ותאריך רשימה
function sortFnc() {
    let containerArr = selectorView.getElementsByClassName('todoContainer');
    let sortArr = [];
    for (let y = 1; y <= 5; y++) {
        for (let i = 0; i < containerArr.length; i++) {
            if (y.toString() === containerArr[i].getElementsByClassName("todoPriority")[0].innerHTML) {
                sortArr.push(containerArr[i]);
                selectorView.removeChild(containerArr[i]);
            }
        }
    }
    for (let x = sortArr.length - 1; x >= 0; x--) {
        selectorView.appendChild(sortArr[x]);
    }
    saveTasks();
}



//זימון פעולת החיפוש
// searchigBottun.addEventListener("click", searchingFnc);

searchInput.addEventListener("keypress", searchingFnc);
searchInput.addEventListener("keyup", searchingFnc);

//פעולה שמחפשת ומשאירה רק את מה שחופש
function searchingFnc() {
    let inputValue = searchInput.value;
    let containerArr = selectorView.getElementsByClassName('todoContainer');
    if (inputValue != "") {
        for (let i = 0; i < containerArr.length; i++) {
            if (containerArr[i].getElementsByClassName("todoText")[0].innerHTML.search(inputValue) === -1) {
                containerArr[i].style.visibility = "hidden";
            } else {
                containerArr[i].style.visibility = "visible";
            }
        }
    } else {
        for (let i = 0; i < containerArr.length; i++) {
            containerArr[i].style.visibility = "visible";
        }
    }

}


// שמירת מידע 
function saveTasks() {
    let divs = selectorView.getElementsByClassName('todoContainer');
    let TasksOfarr = [];
    for (let i = 0; i < divs.length; i++) {
        let arrTask = [];
        arrTask[0] = divs[i].getElementsByClassName("todoText")[0].innerHTML;
        arrTask[1] = divs[i].getElementsByClassName("todoCreatedAt")[0].innerHTML;
        arrTask[2] = divs[i].getElementsByClassName("todoPriority")[0].innerHTML;
        arrTask[3] = divs[i].getElementsByClassName("checkBox")[0].checked;
        TasksOfarr.push(arrTask);
    }
    let JSONReadyArr = JSON.stringify(TasksOfarr);
    localStorage.setItem("tasks", JSONReadyArr);
}

function init() {
    if (localStorage.tasks) {
        let TasksOfarr = JSON.parse(localStorage.getItem("tasks"));
        for (let i = 0; i < TasksOfarr.length; i++) {
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
            checkBox.className = "checkBox";

            todoText.innerHTML = TasksOfarr[i][0];
            todoCreatedAt.innerHTML = TasksOfarr[i][1];
            todoPriority.innerHTML = TasksOfarr[i][2];
            deleteButton.textContent = "Delete";
            checkBox.setAttribute("type", "checkbox");
            checkBox.checked = TasksOfarr[i][3];

            todoContainer.append(todoText, todoCreatedAt, todoPriority, checkBox, deleteButton);
            selectorView.appendChild(todoContainer);

            deleteButton.onclick = function () {
                deletedArr.push(todoContainer);
                selectorView.removeChild(todoContainer);
                counterFnc();
            }

            counterFnc();
        }
    }
}
