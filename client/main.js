const textTaskEL = document.getElementById("text-task");
const taskListEL = document.getElementById("all-tasks");
let allTasks = [];

const addFormListener = (e) => {
    const form = document.getElementById("form-tasks");
    form.onsubmit = (e) => {
        e.preventDefault();
        allTasks.push({
            dataId: Math.random().toString(36).substring(2, 10),
            description: textTaskEL.value,
            isDone: false
        });
        form.reset();
        saveTasksToLS();
        renderTasks();
    }
}

const renderTasks = (e) => {
    const templateTaskList = allTasks.map(task => `<li data-id="${task.dataId}" class="${task.isDone ? "li-task green" : "li-task"}"><input type="checkbox" class="done-task" ${task.isDone ? "checked" : null}><span class="${task.isDone ? "line-through" : null}">${task.description}</span><button class="delete-button"><i class="fa-solid fa-trash delete-task"></i></button></li>`);
    taskListEL.innerHTML = templateTaskList.join("");
    const allChecksTask = document.querySelectorAll(".done-task");
    const allDeleteButtons = document.querySelectorAll(".delete-task");
    allChecksTask.forEach(check => check.addEventListener("click", taskIsDone));
    allDeleteButtons.forEach(deleteButton => deleteButton.addEventListener("click", removeTask));

}

const taskIsDone = (e) => {
    const idTaskToEdit = e.target.parentElement.getAttribute("data-id");
    allTasks.forEach(task => {
        if (task.dataId === idTaskToEdit) {
            task.isDone = !task.isDone;
        }
    });
    saveTasksToLS();
    renderTasks();
}

const removeTask = (e) => {
    const taskToRemove = e.target.parentElement.parentElement.getAttribute('data-id');
    allTasks.forEach((task, index) => {
        if (task.dataId === taskToRemove) {
            allTasks.splice(index, 1);
        }
    });
    saveTasksToLS();
    renderTasks();
}

window.onload = () => {
    addFormListener();
    allTasks = getTasksFromLS() ?? [];  
    renderTasks();      
}

const saveTasksToLS = () => {
    localStorage.setItem("tasks", JSON.stringify(allTasks));
}

const getTasksFromLS = () => {
    return JSON.parse(localStorage.getItem("tasks"));
}