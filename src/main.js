

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
const nameOfList = document.getElementById("nameOfList");
const title = document.getElementById("title");
const selectorPerformed = document.getElementById("Performed");

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
        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fa fa-trash";
        deleteIcon.setAttribute("aria-hidden", "true");
        deleteButton.appendChild(deleteIcon);
        checkBox.setAttribute("type", "checkbox");

        todoContainer.append(todoText, todoCreatedAt, todoPriority, checkBox, deleteButton);
        selectorView.appendChild(todoContainer);

        deleteButton.onclick = function () {
            deletedArr.push(todoContainer);
            selectorView.removeChild(todoContainer);
            counterFnc();
            saveTasks();
        }

        checkBox.onclick = function () {
            if (checkBox.checked) {
                selectorPerformed.appendChild(todoContainer);
            } else {
                selectorView.appendChild(todoContainer);
            }
            saveTasks();
        }
        counterFnc();
    } else {
        Swal.fire("The text box is empty")
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
        counterContinue.innerHTML = " task to do";

    } else {
        counter.innerHTML = divs;
        counterContinue.innerHTML = " tasks to do";
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
    localStorage.clear();
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

    let divsPerformed = selectorPerformed.getElementsByClassName('todoContainer');
    let PreformedOfarr = [];
    for (let i = 0; i < divsPerformed.length; i++) {
        let arrTask = [];
        arrTask[0] = divsPerformed[i].getElementsByClassName("todoText")[0].innerHTML;
        arrTask[1] = divsPerformed[i].getElementsByClassName("todoCreatedAt")[0].innerHTML;
        arrTask[2] = divsPerformed[i].getElementsByClassName("todoPriority")[0].innerHTML;
        arrTask[3] = divsPerformed[i].getElementsByClassName("checkBox")[0].checked;
        PreformedOfarr.push(arrTask);
    }
    let JSONReadyArrPerformed = JSON.stringify(PreformedOfarr);
    localStorage.setItem("Performed", JSONReadyArrPerformed);
    localStorage.setItem("title", title.innerHTML);
}

//פעולה שמחזירה מידע שנשמר לדף בעת עלית הדף
function init() {
    if (localStorage.title) {
        title.innerHTML = localStorage.getItem("title");
    }
    if (localStorage.tasks) {
        let TasksOfarr = JSON.parse(localStorage.getItem("tasks"));
        for (let i = 0; i < TasksOfarr.length; i++) {
            createNewElemt(i, TasksOfarr, selectorView);
        }
    }
    if (localStorage.Performed) {
        let TasksOfarr = JSON.parse(localStorage.getItem("Performed"));
        for (let i = 0; i < TasksOfarr.length; i++) {
            createNewElemt(i, TasksOfarr, selectorPerformed);
        }
    }

}

//פעולה שיוצרת אלמנט, פעולת עזר לפעולה הקודמת
function createNewElemt(i, TasksOfarr, selector) {
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
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa fa-trash";
    deleteIcon.setAttribute("aria-hidden", "true");
    deleteButton.appendChild(deleteIcon);
    checkBox.setAttribute("type", "checkbox");
    checkBox.checked = TasksOfarr[i][3];

    todoContainer.append(todoText, todoCreatedAt, todoPriority, checkBox, deleteButton);
    selector.appendChild(todoContainer);

    deleteButton.onclick = function () {
        deletedArr.push(todoContainer);
        selectorView.removeChild(todoContainer);
        counterFnc();
        saveTasks();
    }
    checkBox.onclick = function () {
        debugger;
        if (checkBox.checked) {
            selectorPerformed.appendChild(todoContainer);
        } else {
            selectorView.appendChild(todoContainer);
        }
        saveTasks();
    }
    counterFnc();
}

//האירוע והפעולה להחלפת שם הרשימה
nameOfList.addEventListener("click", alertOfName);
function alertOfName() {
    swal({
        title: "Change title list",
        text: "Are You Sure?",
        content: "input",
        buttons: {
            cancel: true,
            confirm: "Submit"
        }
    }).then(val => {
        if (val) {
            swal({
                title: "Thanks!",
                text: "You typed: " + val,
                icon: "success"
            });
            title.innerHTML = val;
            saveTasks();
        }
    });

}

//האירוע והפעולה למחיקת על המידע
clear.addEventListener("click", alertAndDelete);
function alertAndDelete() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            deleteEverything();
        }
    })
}
function deleteEverything() {
    localStorage.clear();
    location.reload();
}
