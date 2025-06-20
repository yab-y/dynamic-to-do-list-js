document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage and render them
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // false: don't save again
  }

  // Save tasks array to Local Storage
  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Add a task to the DOM and optionally save it to Local Storage
  function addTask(taskText, save = true) {
    if (!taskText) {
      alert('Please enter a task.');
      return;
    }

    // Create list item
    const li = document.createElement('li');
    li.textContent = taskText;
    li.classList.add('task-item');

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    // Remove task handler
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      if (save) {
        updateLocalStorage();
      }
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (save) {
      updateLocalStorage();
      taskInput.value = '';
    }
  }

  // Update Local Storage based on current tasks in the DOM
  function updateLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
      // li.textContent includes the "Remove" button text, so strip it:
      const text = li.firstChild.textContent || li.textContent; // safer to get firstChild text node
      tasks.push(text.trim());
    });
    saveTasks(tasks);
  }

  // Event listeners
  addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    addTask(taskText);
  });

  taskInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
      const taskText = taskInput.value.trim();
      addTask(taskText);
    }
  });

  // Initial load
  loadTasks();
});


