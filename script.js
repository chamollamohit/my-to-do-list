document.addEventListener("DOMContentLoaded", () => {
    const inputTask = document.getElementById("task-input");
    const addButton = document.querySelector("#add-task-btn");
    const clrButton = document.querySelector("#clear-completed-btn");
    const pendingTasksContainer = document.querySelector("#pending-task-list");
    const completedTasksContainer = document.querySelector("#completed-task-list");

    let tasks = JSON.parse(localStorage.getItem("task")) || []
    read()

    addButton.addEventListener('click',() => {
        const taskText = inputTask.value.trim()
        if(!taskText) return
        const newTask = {
            id: Date.now(),
            text: taskText,
            status: false
        }
        tasks.push(newTask)
        save()
        read()
        inputTask.value = ""
    })
// Displaying Task on Browser
    function read() {
        pendingTasksContainer.innerHTML = ''
        completedTasksContainer.innerHTML = ''

        tasks.forEach((task) => {
            const li = document.createElement('li')
            if (task.status === false) {
                li.setAttribute("data-id", task.id)
                li.setAttribute("Id", "pending-task-list")
                li.textContent = task.text
                pendingTasksContainer.append(li)
                li.addEventListener('click', (event) =>{
                    event.stopPropagation()
                    task.status = true
                    save()
                    read()
                    
                },{once: true})    
            } else {
                li.setAttribute("data-id", task.id)
                li.setAttribute("Id", "completed-task-list")
                li.textContent = task.text
                task.status = true
                completedTasksContainer.append(li)
                li.addEventListener('click', (event) =>{
                    event.stopPropagation()
                    task.status = false
                    save()
                    read()
                },{once: true})
        }
        });       
    }
// Clear Button
    clrButton.addEventListener('click', (event) => {
        event.stopPropagation()
        tasks = tasks.filter((task) => !task.status)
        save()
        read()
    })

// Saving Task in Local Storage
    function save() {
        localStorage.setItem("task", JSON.stringify(tasks) ) 
    }
})