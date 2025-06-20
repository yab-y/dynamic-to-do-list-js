document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            // Create new list item with task text
            const li = document.createElement('li');
            li.textContent = taskText;

            // Create remove button with class and text
            const removeBtn = document.createElement('button');
            removeBtn.textContent = "Remove";
            removeBtn.classList.add('remove-btn');

            // When remove button is clicked, remove this task
            removeBtn.onclick = () => {
                taskList.removeChild(li);
            };

            // Append remove button to task item
            li.appendChild(removeBtn);
            // Append task item to task list
            taskList.appendChild(li);

            // Clear the input
            taskInput.value = "";
        } else {
            alert("Please enter a task.");
        }
    }

    // Add task when "Add Task" button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when Enter key is pressed inside the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

