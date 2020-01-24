import { renderTasks } from './views'
import { setFilters } from './filters'
import { createTask, loadTasks } from './tasks'

renderTasks()

document.querySelector('#searchText').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTasks()
})

document.querySelector('#addTask').addEventListener('submit', (e) => {
    const text = e.target.elements.taskText.value.trim()
    e.preventDefault()

    if (text.length > 0) {
        debugger
        createTask(text)
        renderTasks()
        e.target.elements.taskText.value = ''
    }
})

document.querySelector('#hideCompletedTasks').addEventListener('change', (e) => {
    setFilters({
    	hideCompleted: e.target.checked
    })
    renderTasks()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'tasks') {
        loadTasks()
        renderTasks()
    }
})