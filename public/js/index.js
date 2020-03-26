import { renderTasks } from './views.js';
import { setFilters } from './filters.js';
import { createTask } from './tasks.js';

renderTasks();

document.querySelector('#searchText').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    });
    renderTasks();
});

document.querySelector('#addTask').addEventListener('submit', (e) => {
    const text = e.target.elements.taskText.value.trim();
    e.preventDefault();

    if (text.length > 0) {
        createTask(text);
        renderTasks();
        e.target.elements.taskText.value = '';
    }
});

document.querySelector('#hideCompletedTasks').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    });
    renderTasks();
});

window.addEventListener('storage', (e) => {
    if (e.key === 'tasks') {
        loadTasks();
        renderTasks();
    }
});
