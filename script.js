// const { createElement } = require("react");

document.addEventListener("DOMContentLoaded", () => {
    const inputTask = document.getElementById("task-input");
    const addButton = document.querySelector("#add-task-btn");
    const pendingTask = document.querySelector(".pending");
    const completeTask = document.querySelector(".complete");
    const clrButton = document.querySelector("#clear-completed-btn");
    const pendingTasksContainer = document.querySelector("#pending-task-list");
    const completedTasksContainer = document.querySelector("#completed-task-list");


    let tasks = JSON.parse(localStorage.getItem("task")) || [];
    readTask();
// Task Adding Button here
    addButton.addEventListener("click", () => {
        const taskText = inputTask.value.trim();
        if (taskText === "") return;
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };

        tasks.push(newTask);
        saveTasks();
        readTask()
        inputTask.value = "";
        // console.log(newTask);
    });
// ReadTask fucntion from Localstorage
    function readTask() {
        pendingTasksContainer.innerHTML = '';
        completedTasksContainer.innerHTML = '';
        // console.log(pendingTasksContainer)
        tasks.forEach((task) => {
            
            // console.log(task);
            if (task.completed === true) return
            const li = document.createElement("li");
            li.setAttribute("data-id", task.id);
            li.setAttribute("Id", "pending-task-list");
            li.textContent = task.text;
            pendingTasksContainer.appendChild(li);
            li.addEventListener(
                "click",
                (event) => {
                    event.stopPropagation();
                    task.completed = !task.completed;
                    li.setAttribute("Id", "completed-task-list");
                    li.remove();
                    completedTasksContainer.appendChild(li);
                    // saveTasks();
                },
                { once: true }
            );
        });



    }
// Clear Completed Task Button
    clrButton.addEventListener("click", (event) => {
        event.stopPropagation();
        tasks = tasks.filter((t) => t.completed === false);
        // console.log(tasks);
        saveTasks()
        readTask()

    });

// Save Task in Localstorage
    function saveTasks() {
        localStorage.setItem("task", JSON.stringify(tasks));
    }
});