document.getElementById("taskForm").addEventListener("submit", function (event) {
        event.preventDefault();
        addTask();
    });

let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");
let editTask = false;
let currentTask;

async function fetchTasks() {
    try {
        const response = await fetch("/myTask");
        const tasks = await response.json();
        tasks.forEach((task) => {
            addTaskToUI(task.description, task.date, task.id);
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

function addTaskToUI(taskDescription, taskDate, taskId) {
    const li = document.createElement("li");
    const taskText = document.createElement("span");
    taskText.textContent = taskDescription;
    li.appendChild(taskText);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "x";
    deleteButton.style.marginLeft = "-20px";
    deleteButton.onclick = function () {
        const confirmation = confirm("Are you sure you want to delete this task?");
        if (confirmation) {
            taskId, li;
        }
    };

    const updateButton = document.createElement("button");
    updateButton.classList.add("update-btn");

    const pencilIcon = document.createElement("img");
    pencilIcon.src = "/images/pencil-solid.svg";
    pencilIcon.alt = "Pencil Icon";
    updateButton.appendChild(pencilIcon);
    updateButton.onclick = function () {
        taskInput.value = taskText.textContent;
        currentTask = li;
        editTask = true;
    };

    li.appendChild(updateButton);

    // Done button
    const doneButton = document.createElement("button");
    doneButton.classList.add("done-btn");
    doneButton.textContent = "Done";
    doneButton.onclick = function () {
        taskText.style.textDecoration = "line-through";
        taskText.style.color = "grey";
        doneButton.disabled = true;
        updateButton.disabled = true;
    };

    li.appendChild(deleteButton);
    li.appendChild(updateButton);
    li.appendChild(doneButton);
    taskList.appendChild(li);
}

async function addTask() {
    const task = taskInput.value.trim();
    if (task === "") {
        alert("Please add a task before submitting.");
        return;
    }

    const taskData = {
        description: task,
        date: new Date().toISOString().split("T")[0],
    };

    try {
        const response = await fetch("/api/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData),
        });
        const data = await response.json();
        addTaskToUI(data.description, data.date, data.id);
    } catch (error) {
        console.error("Error adding task:", error);
    }

    taskInput.value = "";
}

async function deleteTask(taskId, li) {
    try {
        await fetch("/api/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: taskId }),
        });
        taskList.removeChild(li);
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

window.onload = fetchTasks;
