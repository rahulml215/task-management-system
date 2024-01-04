document.addEventListener("DOMContentLoaded", function () {
    loadTasks();

    document.getElementById("taskForm").addEventListener("submit", function (event) {
        event.preventDefault();
        addTask();
    });
});

function loadTasks() {
    fetch("http://localhost:8080/api/tasks")
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = "";
            tasks.forEach(task => {
                const listItem = document.createElement("li");
                listItem.className = "list-group-item";
                listItem.innerHTML = `${task.title} 
                    <button class="btn btn-danger btn-sm float-right" onclick="deleteTask(${task.id})">Delete</button>
                    <button class="btn btn-success btn-sm float-right mr-2" onclick="updateTask(${task.id})">Update</button>`;
                taskList.appendChild(listItem);
            });
        });
}

function addTask() {
    const taskTitle = document.getElementById("taskTitle").value;

    fetch("http://localhost:8080/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: taskTitle })
    })
        .then(response => response.json())
        .then(() => {
            loadTasks();
            document.getElementById("taskForm").reset();
        });
}

function deleteTask(id) {
    fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: "DELETE"
    })
        .then(() => loadTasks());
}

function updateTask(id) {
    const newTitle = prompt("Enter the new task title:");
    if (newTitle !== null) {
        fetch(`http://localhost:8080/api/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: newTitle })
        })
            .then(() => loadTasks());
    }
}
