import { getTasks, toggleTask, removeTask } from './tasks.js';
import { getFilters } from './filters.js';

const renderTasks = () => {
    const tasksEl = document.querySelector('#tasks');
    const { searchText, hideCompleted } = getFilters();
	const filteredTasks = getTasks().filter((task) => {
        const searchTextMatch = task.text.toLowerCase().includes(searchText.toLowerCase());
        const hideCompletedMatch = !hideCompleted || !task.completed;

        return searchTextMatch && hideCompletedMatch;
    });
	const incompleteTasks = filteredTasks.filter((task) => !task.completed);

    tasksEl.innerHTML = '';
    tasksEl.appendChild(generateSummaryDOM(incompleteTasks));

    if (filteredTasks.length > 0) {
        filteredTasks.forEach((task) => {
            tasksEl.appendChild(generateTaskDOM(task));
        });
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.classList.add('empty-message');
        emptyMessage.textContent = 'No tasks to show';
        tasksEl.appendChild(emptyMessage);
    }
};

const generateTaskDOM = (task) => {
    const taskEl = document.createElement('label');
    const containerEl = document.createElement('div');
    const checkbox = document.createElement('input');
    const textEl = document.createElement('span');
    const button = document.createElement('button');

    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = task.completed;
    containerEl.appendChild(checkbox);
    checkbox.addEventListener('change', () => {
        toggleTask(task.id);
        renderTasks();
    });

    textEl.textContent = task.description;
    containerEl.appendChild(textEl);

    taskEl.classList.add('list-item');
    containerEl.classList.add('list-item__container');
    taskEl.appendChild(containerEl);

    button.textContent = 'remove';
    button.classList.add('button', 'button--text');
    taskEl.appendChild(button);
    button.addEventListener('click', () => {
        removeTask(task.id);
        renderTasks();
    });

    return taskEl;
};

const generateSummaryDOM = (incompleteTasks) => {
    const summary = document.createElement('h2');
    const plural = incompleteTasks.length === 1 ? '' : 's';
    summary.classList.add('list-title');
	summary.textContent = `You have ${incompleteTasks.length} task${plural} left`;
    return summary;
};

export { generateTaskDOM, renderTasks, generateSummaryDOM };
