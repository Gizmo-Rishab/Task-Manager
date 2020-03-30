let tasks = [];
const Crypto = window.crypto || window.msCrypto;

const loadTasks = async () => {
    const response = await fetch('/tasks');

    try {
        tasks = await response.json();
    } catch (error) {
        tasks = [];
    }
};

const saveTasks = () => {
    fetch('/tasks', { method: 'post', body: tasks });
};

const getTasks = () => tasks;

const createTask = (text) => {
    const task = {
        text,
        completed: false
    };

    tasks.push({
        uuid: Crypto.getRandomValues(new Uint32Array(1))[0],
        ...task
    });

    fetch('/tasks', {
        method: 'post',
        body: JSON.stringify(task),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
};

const removeTask = (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
        saveTasks();
    }
};

const toggleTask = (id) => {
    const task = tasks.find((task) => task.id === id);

    if (task) {
        task.completed = !task.completed;
        saveTasks();
    }
};

export { loadTasks, getTasks, createTask, removeTask, toggleTask };
