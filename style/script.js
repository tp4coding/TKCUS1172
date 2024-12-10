document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById("task-form");
    const taskList = document.getElementById("task-list");
    let tasks = [];

    taskForm.onsubmit = function(event) {
        event.preventDefault();
        const taskTitle = document.getElementById("task-title").value;
        const taskPriority = document.getElementById("task-priority").value;
        const task = { title: taskTitle, priority: taskPriority };
        tasks.push(task);
        addTaskToDOM(task, tasks.length - 1);
        taskForm.reset();
    };

    function addTaskToDOM(task, index) {
        const li = document.createElement("li");
        li.textContent = task.title + " (Priority: " + task.priority + ") ";
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.onclick = function() {
            li.classList.add("completed");
        };
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = function() {
            tasks.splice(index, 1);
            li.remove();
        };
        li.appendChild(completeBtn);
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }
});
