// Modal Button
var taskModal = document.getElementById("AddTaskModal");
var btn = document.getElementById("TaskBtn");
var editBtn = document.getElementById("EditBtn");
var span = document.getElementsByClassName("close")[0];

//Button to show add task
btn.onclick = function () {
    if (taskModal.style.display == "none") {
        taskModal.style.display = "block";
    } else {
        taskModal.style.display = "none";
    }
}

// Task List
const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("duedate");
const descInput = document.getElementById("desc");
const addTaskButton = document.getElementById("add-task");
const editTaskButton = document.getElementById("edit-Task");
const taskList = document.getElementById("task-list");

//Task arrays
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
const finishedTasks = JSON.parse(localStorage.getItem("done")) || [];

// Functions for saving tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

function doneTasks() {
    localStorage.setItem("done", JSON.stringify(finishedTasks));
}

// Function for rendering tasks
function renderTasks() {
    taskList.innerHTML = "";
    savedTasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task");
        taskItem.innerHTML = `
            <p>${task.task}</p>
            <p>Priority: ${task.priority}</p>
            <p>Deadline: ${task.deadline}</p>
            <p>Description: ${task.description}</p>
            <button class="edit-task">Edit Task</button>
            <button class="mark-done">Mark Done</button>
            `;
        taskList.appendChild(taskItem);
    });
}

// Event listener for loading tasks on window load
window.addEventListener("load", renderTasks);

// Event listener for adding a new task
addTaskButton.addEventListener("click", () => {
    const task = taskInput.value;
    const priority = priorityInput.value;
    const deadline = deadlineInput.value;
    const description = descInput.value;

    // Validation checks for task inputs
    if (task.trim() === "" || deadline === "") {
        alert("Please select a future date for the due-date")
        return;
    }

    // Catch for selecting due date for calendar
    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
        alert("You must select a future date.")
        return;
    }

    // Adding new task to saved tasks
    savedTasks.push({ task, priority, deadline, description });
    saveTasks();

    // Rendering updated tasks
    renderTasks();

    // Clearing task inputs
    taskInput.value = "";
    priorityInput.value = "top";
    deadlineInput.value = "";
    descInput.value = "";
});

// Event listener for marking a task as done
taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("mark-done")) {
        const taskItem = event.target.parentElement;
        const taskIndex = Array.from(taskItem.parentElement.children).indexOf(taskItem);

        // Removing completed task from saved tasks and adding to finished tasks
        const completedTask = savedTasks.splice(taskIndex, 1)[0];
        finishedTasks.push(completedTask);

        // Saving updated tasks
        saveTasks();
        doneTasks();

        // Rendering updated tasks
        renderTasks();
    }

    // Event listener for editing a task
    if (event.target.classList.contains("edit-task")) {

        const taskItem = event.target.parentElement;
        const taskIndex = Array.from(taskItem.parentElement.children).indexOf(taskItem);

        const task = savedTasks[taskIndex];

        // Updating task inputs with selected task details
        taskInput.value = task.task;
        priorityInput.value = task.priority;
        deadlineInput.value = task.deadline;
        descInput.value = task.description;

        // Removing edited task from saved tasks
        savedTasks.splice(taskIndex, 1);
        saveTasks();

        // Rendering updated tasks
        renderTasks();
    }
});

// Show Done Button and Completed Tasks Modal
var showDoneButton = document.getElementById("ShowDoneBtn");
var completedTasksModal = document.getElementById("completed-tasks-modal");
var closeCompletedTasksModal = document.getElementsByClassName("close")[0];

// Function for rendering completed tasks
function renderCompletedTasks() {
    const completedTasksList = document.getElementById("completed-tasks-list");
    completedTasksList.innerHTML = ""; // Clear previous tasks

    finishedTasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("completed-task");
        taskItem.innerHTML = `
            <p>${task.task}</p>
            <p>Priority: ${task.priority}</p>
            <p>Deadline: ${task.deadline}</p>
            <p>Description: ${task.description}</p>
        `;
        completedTasksList.appendChild(taskItem);
    });
}

// Event listener for showing completed tasks modal
showDoneButton.onclick = function () {
    completedTasksModal.style.display = "block";
    renderCompletedTasks(); 
}

// Event listener for closing completed tasks modal
closeCompletedTasksModal.onclick = function () {
    completedTasksModal.style.display = "none";
}

// Event listener for closing completed tasks modal when clicking outside modal
window.onclick = function (event) {
    if (event.target == completedTasksModal) {
        completedTasksModal.style.display = "none";
    }
}

const deleteTaskButton = document.getElementById("delete-task");

// Delete Button
deleteTaskButton.addEventListener("click", () => {
    // Clear the value of each input field
    taskInput.value = "";
    priorityInput.value = "top";
    deadlineInput.value = "";
    descInput.value = "";
});

