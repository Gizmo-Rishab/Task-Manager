import uuidv4 from 'uuid/v4'

let tasks = []

const loadTasks = () => {
    const tasksJSON = localStorage.getItem('tasks')
    
    try {
        tasks = tasksJSON ? JSON.parse(tasksJSON) : []
    } catch (e) {
        tasks = []
    }
}

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const getTasks = () => tasks

const createTask = (text) => {
    tasks.push({
    	id: uuidv4(),
        text,
        completed: false
    })
    saveTasks()
}

const removeTask = (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === id)

    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1)
        saveTasks()
    }
}

const toggleTask = (id) => {
    const task = tasks.find((task) => task.id === id)

    if (task) {
        task.completed = !task.completed
        saveTasks()
    }
}

loadTasks()

export { loadTasks, getTasks, createTask, removeTask, toggleTask }