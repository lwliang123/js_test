const taskInput = document.getElementById("taskInput");

const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

let tasks = [];

function addTask() {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                tasks.push({ text: taskText});
                taskInput.value = "";
                displayTasks();
            }
        }

function displayTasks() {
            taskList.innerHTML = "";
            tasks.forEach((task, index) => {
                const li = document.createElement("li");
                li.innerHTML = `<input type="checkbox" id="task-${index}" ${task.completed ? "checked" : ""}>
                    <label for="task-${index}">${task.text}</label>`;
                li.querySelector("input").addEventListener("change", () => toggleTask(index));
                taskList.appendChild(li);
            });
        }

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function clearCompletedTasks() {
        tasks = tasks.filter(task => !task.completed);
        displayTasks();
    }



function clearAllTasks() {
    tasks = []; // Set the tasks array to an empty array to remove all tasks
    displayTasks(); // Update the task list display
}

addTaskBtn.addEventListener("click", addTask);
clearAllBtn.addEventListener("click", clearAllTasks);
clearCompletedBtn.addEventListener("click", clearCompletedTasks);

 displayTasks();